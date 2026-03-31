import Enrollment from "../models/Enrollment.js";
import Progress from "../models/Progress.js";
import Certificate from "../models/Certificate.js";

export const userDashboard = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    console.log(`[Dashboard] Fetching dashboard for User: ${userId}`);

    // Fetch enrollments (ongoing/active and completed)
    const [enrollments, certs] = await Promise.all([
      Enrollment.find({
        $or: [{ userId }, { user: userId }],
        status: { $in: ["active", "ongoing", "completed"] }
      })
        .populate({ path: "courseId", strictPopulate: false })
        .populate({ path: "course", strictPopulate: false })
        .lean(),

      Certificate.find({
        $or: [{ userId }, { user: userId }]
      })
        .populate({ path: "courseId", strictPopulate: false })
        .populate({ path: "course", strictPopulate: false })
        .lean(),
    ]);

    // Import progress updater
    const { updateCourseProgress } = await import("./progressController.js")

    // Process enrollments and sync progress
    const ongoing = [];
    const completed = [];

    for (const e of enrollments) {
      const actualCourseId = e.courseId?._id || e.course?._id || e.courseId || e.course;
      if (!actualCourseId) continue;

      // Sync progress for ongoing courses to ensure accuracy
      let currentProgress = e.progress || 0;
      if (e.status !== "completed") {
        const p = await updateCourseProgress(userId, actualCourseId);
        currentProgress = p ? p.overallProgress : currentProgress;
      }

      const courseData = e.courseId || e.course || {};
      const item = {
        id: e._id,
        courseId: actualCourseId,
        course: courseData.title || "Untitled",
        percentage: currentProgress,
        status: e.status,
        enrolledAt: e.enrolledAt
      };

      if (e.status === "completed") {
        item.completedAt = e.completedAt;
        completed.push(item);
      } else {
        ongoing.push(item);
      }
    }

    console.log(`[Dashboard] Dashboard stats for User: ${userId}: Ongoing: ${ongoing.length}, Completed: ${completed.length}, Certs: ${certs.length}`);

    res.json({
      ongoing,
      completed,
      certificates: certs.map(c => ({
        id: c._id,
        certId: c.certificateId || c.certId,
        course: (c.courseId?.title || c.course?.title || "Untitled"),
        issuedAt: c.issuedDate || c.issuedAt || null,
      })),
    });
  } catch (error) {
    console.error("[Dashboard] Error in userDashboard:", error);
    next(error);
  }
};

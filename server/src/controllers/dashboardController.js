import Enrollment from "../models/Enrollment.js";
import Progress from "../models/Progress.js";
import Certificate from "../models/Certificate.js";

export const userDashboard = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const userId = req.user.id;

    const [ongoing, completed, certs, progress] = await Promise.all([
      Enrollment.find({ userId: userId, status: "active" })
        .populate("courseId", "title")
        .lean(),

      Enrollment.find({ userId: userId, status: "completed" })
        .populate("courseId", "title completedAt")
        .lean(),

      Certificate.find({ userId: userId })
        .populate("courseId", "title issuedAt")
        .lean(),

      Progress.find({ userId: userId })
        .select("courseId percentage")
        .lean(),
    ]);

    const progressMap = new Map(
      progress.map(p => [p.courseId?.toString(), p.percentage])
    );

    res.json({
      ongoing: ongoing.map(e => ({
        id: e._id,
        course: e.courseId?.title || "Untitled",
        percentage: progressMap.get(e.courseId?._id?.toString()) || 0,
      })),

      completed: completed.map(e => ({
        id: e._id,
        course: e.courseId?.title || "Untitled",
        completedAt: e.completedAt || null,
      })),

      certificates: certs.map(c => ({
        id: c._id,
        certId: c.certId,
        course: c.courseId?.title || "Untitled",
        issuedAt: c.issuedAt || null,
      })),
    });
  } catch (error) {
    next(error);
  }
};

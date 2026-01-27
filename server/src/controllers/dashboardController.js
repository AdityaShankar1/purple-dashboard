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
      Enrollment.find({ user: userId, status: "ongoing" })
        .populate("course", "title")
        .lean(),

      Enrollment.find({ user: userId, status: "completed" })
        .populate("course", "title completedAt")
        .lean(),

      Certificate.find({ user: userId })
        .populate("course", "title issuedAt")
        .lean(),

      Progress.find({ user: userId })
        .select("course percentage")
        .lean(),
    ]);

    const progressMap = new Map(
      progress.map(p => [p.course?.toString(), p.percentage])
    );

    res.json({
      ongoing: ongoing.map(e => ({
        id: e._id,
        course: e.course?.title || "Untitled",
        percentage: progressMap.get(e.course?._id?.toString()) || 0,
      })),

      completed: completed.map(e => ({
        id: e._id,
        course: e.course?.title || "Untitled",
        completedAt: e.completedAt || null,
      })),

      certificates: certs.map(c => ({
        id: c._id,
        certId: c.certId,
        course: c.course?.title || "Untitled",
        issuedAt: c.issuedAt || null,
      })),
    });
  } catch (error) {
    next(error);
  }
};

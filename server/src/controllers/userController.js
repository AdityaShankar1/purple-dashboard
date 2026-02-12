import Enrollment from "../models/Enrollment.js";
import Certificate from "../models/Certificate.js";

/**
 * @desc    Get user metrics for dashboard
 * @route   GET /api/user/metrics
 * @access  Private
 */
export const getUserMetrics = async (req, res, next) => {
    try {
        const userId = req.user?._id || req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const [enrolledCourses, completedCourses, certCount] = await Promise.all([
            Enrollment.countDocuments({
                $or: [{ userId }, { user: userId }]
            }),
            Enrollment.countDocuments({
                $or: [{ userId }, { user: userId }],
                status: "completed"
            }),
            Certificate.countDocuments({
                $or: [{ userId }, { user: userId }]
            }),
        ]);

        const ongoingCourses = enrolledCourses - completedCourses;

        res.json({
            enrolledCourses,
            completedCourses,
            certificates: certCount,
            ongoingCourses: ongoingCourses > 0 ? ongoingCourses : 0
        });
    } catch (err) {
        console.error("[UserMetrics] Error:", err);
        next(err);
    }
};

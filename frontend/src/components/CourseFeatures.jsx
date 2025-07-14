import {
  GraduationCap,
  Clock,
  Globe,
  ShieldCheck,
  RefreshCcw,
  CheckCircle,
  Users,
  Undo2,
} from "lucide-react";

const CourseFeatures = () => {
  return (
    <div className="grid grid-cols-2">
      <ul className="space-y-2 pt-2 text-base-content">
        <li className="flex items-center gap-2">
          <GraduationCap className="text-primary" size={18} />
          Expert-led Lessons
        </li>
        <li className="flex items-center gap-2">
          <RefreshCcw className="text-primary" size={18} />
          Lifetime Access & Free Updates
        </li>
        <li className="flex items-center gap-2">
          <Clock className="text-primary" size={18} />
          Learn Anytime, Anywhere
        </li>
        <li className="flex items-center gap-2">
          <ShieldCheck className="text-primary" size={18} />
          Certificate of Completion
        </li>
      </ul>
      <ul className="space-y-2 pt-2 text-base-content">
        <li className="flex items-center gap-2">
          <CheckCircle className="text-primary" size={18} />
          No Prerequisites Required
        </li>
        <li className="flex items-center gap-2">
          <Globe className="text-primary" size={18} />
          100% Online & Flexible Schedule
        </li>
        <li className="flex items-center gap-2">
          <Undo2 className="text-primary" size={18} />
          30-Day Money Back Guarantee
        </li>
        <li className="flex items-center gap-2">
          <Users className="text-primary" size={18} />
          Join a Global Learning Community
        </li>
      </ul>
    </div>
  );
};

export default CourseFeatures;

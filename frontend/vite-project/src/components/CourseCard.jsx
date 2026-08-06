export default function CourseCard({ course }) {
  return (
    <div className="border rounded-lg p-4 shadow bg-white">

      <h3 className="font-bold">
        {course.name}
      </h3>

      <p className="text-gray-600">
        {course.provider}
      </p>

      <p className="text-sm mt-2">
        Level : {course.level}
      </p>

    </div>
  );
}
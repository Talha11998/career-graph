export default function JobCard({ job }) {
  return (
    <div className="border rounded-lg p-4 shadow bg-white">
      <h3 className="font-bold text-lg">
        {job.job.title}
      </h3>

      <p className="text-gray-600">
        {job.job.company}
      </p>

      <p className="mt-2">
        Matching Skills :
        <span className="font-semibold text-green-600">
          {" "}{job.score}
        </span>
      </p>
    </div>
  );
}
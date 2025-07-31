import ErrorUI from "@/components/shared/error-ui";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <ErrorUI type="notFound" />
    </div>
  );
}

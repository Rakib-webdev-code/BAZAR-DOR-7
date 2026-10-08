import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  return (
    <EmptyState
      title="পেজটি পাওয়া যায়নি"
      message="আপনি যে পেজটি খুঁজছেন তা নেই অথবা সরিয়ে নেওয়া হয়েছে।"
    />
  );
}
/** Logo mark + wordmark. The mark nods to the app's task-checkmark motif. */
export default function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-[0.7rem] bg-brand text-white shadow-sm">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4.5 12.5l2.2 4.2c.25.48.9.52 1.2.08L19.5 6.5"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {!compact && (
        <span className="font-display text-lg font-bold tracking-tight text-ink">
          אופן סטודנט
        </span>
      )}
    </span>
  );
}

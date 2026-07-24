/**
 * Emits schema.org JSON-LD into the server-rendered HTML.
 *
 * Deliberately a server component: AI crawlers fetch HTML without executing
 * JavaScript, so structured data injected after hydration would be invisible
 * to exactly the readers it exists for.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

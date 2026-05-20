import {
  Badge,
  Eyebrow,
  Meter,
  MiniBars,
  Surface,
} from "@/shared/ui";
import {
  recentScreenings,
  severityLabel,
  severityVariant,
  type ScreeningResult,
} from "@/entities/screening";
import { formatDateShort } from "@/shared/lib/format";

function WellbeingCard({ result }: { result: ScreeningResult }) {
  const variant = severityVariant[result.severity];
  const pct = (result.score / result.max) * 100;
  return (
    <Surface className="p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Eyebrow>{result.kind}</Eyebrow>
        <Badge variant={variant}>{severityLabel[result.severity]}</Badge>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-serif-display text-[44px] leading-none text-ink">
          {result.score}
        </span>
        <span className="text-[13px] text-ink-3">из {result.max}</span>
        <span className="ml-auto font-mono text-[11px] text-ink-3">
          {formatDateShort(result.takenAt)}
        </span>
      </div>
      <Meter
        value={pct}
        variant={variant === "critical" ? "critical" : variant}
      />
      <MiniBars values={result.trend} variant={variant === "critical" ? "amber" : variant} />
    </Surface>
  );
}

export function WellbeingCards() {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-serif-display text-[22px] text-ink">Самочувствие</h2>
        <span className="font-mono text-[11px] tracking-[0.06em] text-ink-3">
          последние 30 дней
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {recentScreenings.map((r) => (
          <WellbeingCard key={r.kind} result={r} />
        ))}
      </div>
    </section>
  );
}

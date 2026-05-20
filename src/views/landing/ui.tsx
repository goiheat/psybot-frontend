import Link from "next/link";
import { ArrowRight, ShieldCheck, Server, Trash2 } from "lucide-react";

import {
  Badge,
  BreathMark,
  Button,
  Eyebrow,
  LiveDot,
  Logo,
} from "@/shared/ui";
import { ThemeToggle } from "@/features/theme-toggle";

const doList = [
  "Слушаю и задаю уточняющие вопросы в логике КПТ и ACT",
  "Провожу короткие скрининги — PHQ-9, GAD-7",
  "Помогаю в острых эпизодах — заземление, дыхание",
  "Замечаю критические состояния и передаю живому терапевту",
];

const dontList = [
  "Не ставлю психиатрические диагнозы",
  "Не назначаю препараты и не отменяю лечение",
  "Не заменяю терапию и не веду кризисные случаи",
  "Не храню переписку на серверах без твоего согласия",
];

const features = [
  {
    title: "КПТ + ACT",
    text:
      "30–40 техник из доказательной психотерапии. Каждая — это структурированный протокол, который ревьюирует клинический консультант.",
  },
  {
    title: "Скрининги внутри разговора",
    text:
      "PHQ-9 и GAD-7 встроены в диалог как структурированные данные. Никаких отдельных форм — только короткие шаги.",
  },
  {
    title: "Safety layer",
    text:
      "Гейт-вопросы и regex-триггеры для критических состояний. При срабатывании — обход обычного flow и срочная эскалация.",
  },
  {
    title: "PII redaction до LLM",
    text:
      "Имена, телефоны, документы вычищаются ещё до того, как сообщение уходит модели. Failsafe default-deny.",
  },
];

export function LandingView() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 lg:px-12 pt-6 flex items-center justify-between">
        <Logo size="md" sublabel="design preview · v0.4" />
        <div className="flex items-center gap-5 text-[13px] text-ink-3">
          <Link
            href="/login"
            className="hidden sm:inline hover:text-ink transition"
          >
            Войти
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 px-6 lg:px-12 py-14 lg:py-20">
        <div className="max-w-[760px] mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <BreathMark />
            <div className="flex-1 h-px bg-rule" />
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3">
              MVP · 2026 · клиника «Эмпатия»
            </span>
          </div>

          <h1 className="font-serif-display text-[44px] md:text-[64px] leading-[1.02] tracking-[-0.015em] text-ink font-normal mb-8 text-balance">
            Я не врач<br />и не ставлю <em className="italic">диагнозов</em>.
          </h1>

          <p className="text-[19px] text-ink-2 max-w-[580px] mb-14 leading-[1.55] text-pretty">
            Помогу разобраться с тревогой, настроением, стрессом. Если что-то
            серьёзное — направлю к специалисту клиники-партнёра.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-20">
            <Button asChild variant="ink" size="lg">
              <Link href="/chats">
                Начать разговор
                <ArrowRight />
              </Link>
            </Button>
            <div className="flex items-center gap-3 text-[13px] text-ink-3">
              <span>займёт 5–10 минут</span>
              <span className="w-px h-3 bg-rule" />
              <Link
                href="/login"
                className="hover:text-ink transition underline underline-offset-4 decoration-rule hover:decoration-ink-3"
              >
                продолжить прошлую сессию
              </Link>
            </div>
          </div>

          {/* what I do / what I don't */}
          <div className="grid md:grid-cols-2 gap-px rounded-[12px] overflow-hidden border border-rule bg-rule">
            <div className="p-7 bg-card">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-deep" />
                <Eyebrow className="text-sage-deep">Что я делаю</Eyebrow>
              </div>
              <ul className="space-y-3 text-[15px] text-ink-2">
                {doList.map((d, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-mono text-[11px] text-ink-3 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-7 bg-card">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-clay" />
                <Eyebrow className="text-clay">Чего я не делаю</Eyebrow>
              </div>
              <ul className="space-y-3 text-[15px] text-ink-2">
                {dontList.map((d, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-mono text-[11px] text-ink-3 mt-0.5">
                      —
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* methodology */}
          <section className="mt-20">
            <div className="flex items-center gap-3 mb-6">
              <Eyebrow>Что внутри</Eyebrow>
              <span className="flex-1 h-px bg-rule-soft" />
            </div>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
              {features.map((f) => (
                <div key={f.title}>
                  <h3 className="font-serif-display text-[20px] text-ink mb-2">
                    {f.title}
                  </h3>
                  <p className="text-[15px] text-ink-2 leading-relaxed">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* methodology + privacy */}
          <div className="mt-16 flex flex-col md:flex-row gap-8 md:gap-12 md:items-start">
            <div className="md:w-1/2">
              <Eyebrow className="mb-2">Основано на</Eyebrow>
              <p className="text-[14px] text-ink-2 leading-relaxed">
                Beck Institute CBT manual · ACT (Hayes, Strosahl, Wilson) ·
                валидированные русские версии PHQ-9 и GAD-7. Научный совет —
                клиника «Эмпатия».
              </p>
            </div>
            <div className="md:w-1/2">
              <Eyebrow className="mb-2">Конфиденциальность</Eyebrow>
              <p className="text-[14px] text-ink-2 leading-relaxed">
                Сессия хранится локально. Обработка данных — по{" "}
                <a className="underline underline-offset-4 decoration-rule hover:decoration-ink-3" href="#">
                  152-ФЗ
                </a>
                . Можно прервать в любой момент и удалить историю.
              </p>
            </div>
          </div>

          {/* trust strip */}
          <div className="mt-16 flex flex-wrap items-center gap-6 text-[12.5px] text-ink-3">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-sage-deep" />
              соответствует 152-ФЗ
            </span>
            <span className="inline-flex items-center gap-2">
              <Server className="size-4 text-sage-deep" />
              серверы на территории РФ
            </span>
            <span className="inline-flex items-center gap-2">
              <Trash2 className="size-4 text-sage-deep" />
              можно удалить всё одной кнопкой
            </span>
            <span className="ml-auto inline-flex items-center gap-2 font-mono">
              <LiveDot />
              <span>сборка от 15.05.26</span>
            </span>
          </div>

          {/* what others say (placeholder) */}
          <section className="mt-20 mb-8">
            <Eyebrow className="mb-4">Голоса клиницистов</Eyebrow>
            <blockquote className="font-serif-display text-[24px] md:text-[28px] leading-snug text-ink-2 max-w-[640px] text-balance">
              «Не вижу, чтобы кто-то ещё на рынке так аккуратно отделял
              самопомощь от триажа. Это первое, что я бы дала пациенту между
              сессиями.»
            </blockquote>
            <div className="mt-4 flex items-center gap-3 text-[13px] text-ink-3">
              <Badge variant="sage">клиницист, клиника «Эмпатия»</Badge>
              <span>· demo-revue, апрель 2026</span>
            </div>
          </section>
        </div>
      </main>

      <footer className="px-6 lg:px-12 py-6 border-t border-rule-soft flex items-center justify-between text-[12px] text-ink-3">
        <div className="font-mono">PsyBoy · MVP · 2026</div>
        <div className="flex items-center gap-5">
          <a className="hover:text-ink" href="#">
            Политика
          </a>
          <a className="hover:text-ink" href="#">
            Согласие
          </a>
          <a className="hover:text-ink" href="#">
            Поддержка
          </a>
        </div>
      </footer>
    </div>
  );
}

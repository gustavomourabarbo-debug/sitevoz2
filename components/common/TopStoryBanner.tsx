import Link from "next/link";

type Props = {
  href: string;
  kicker?: string;
  title: string;
  excerpt?: string;
  image: string;
};

export default function TopStoryBanner({
  href,
  kicker = "ANÁLISE DE PAULO FAYAD",
  title,
  excerpt,
  image,
}: Props) {
  return (
    <section className="my-6">
      <Link
        href={href}
        className="group grid overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg md:grid-cols-2"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-auto md:h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
            loading="eager"
          />
        </div>

        <div className="flex flex-col justify-center gap-3 p-5 md:p-8">
          <span className="w-fit rounded-full bg-red-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            {kicker}
          </span>
          <h2 className="text-2xl font-extrabold leading-tight text-neutral-900 md:text-3xl">
            {title}
          </h2>
          {excerpt ? (
            <p className="line-clamp-4 text-sm leading-relaxed text-neutral-600 md:text-base">
              {excerpt}
            </p>
          ) : null}
          <span className="mt-1 w-fit text-sm font-semibold text-red-700 underline-offset-4 group-hover:underline">
            Ler matéria completa
          </span>
        </div>
      </Link>
    </section>
  );
}

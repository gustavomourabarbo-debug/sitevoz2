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
  kicker = "MANCHETE",
  title,
  excerpt,
  image,
}: Props) {
  return (
    <section className="my-5">
      <Link href={href} className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-md transition hover:shadow-xl">
        <div className="flex flex-col justify-center gap-3 p-6 md:p-8">
          <span className="w-fit rounded-full bg-red-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">{kicker}</span>
          <h2 className="text-2xl font-extrabold leading-tight text-neutral-900 md:text-4xl">{title}</h2>
          {excerpt ? <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600 md:text-base">{excerpt}</p> : null}
          <span className="mt-1 w-fit text-sm font-semibold text-red-700 underline-offset-4 group-hover:underline">Ler matéria completa</span>
        </div>
      </Link>
    </section>
  );
}

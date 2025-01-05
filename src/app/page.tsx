import Link from "next/link";

export default  function Home() {

  return (
    <section className="py-6">
      <div className="text-center mx-auto py-12 px-4 ">

      <Link href={'/dashboard'} className="block p-4">
        <span className="text-3xl font-extrabold text-black">
          Produts List
        </span>
      </Link>
        <span className="text-sm">
        This project is a Next.js application leveraging Server Actions for efficient server-side functionality, Auth.js for secure and scalable authentication, and Vercel Postgres for reliable database storage. The app includes full CRUD  operations for managing products, offering a complete platform for e-commerce, content management, or inventory system
        </span>
      <div className="flex-shrink-0">
        <div className="mt-12 inline-flex rounded-md">
        </div>
      </div>
      </div>
    </section>
  );
}

import Link from "next/link"
export default function Header(){
    return(
        <section className="px-10 py-2">
            <Link href="/">
            <div className="w-15 flex items-center">
                <img src="/asset/SahamkuLogo.png" alt="Logo" />
                <h1 className="font-bold text-xl text-rose-800">SAHAMKU</h1>
            </div>
            </Link>
        </section>
    )
}
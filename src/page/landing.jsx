import { Link } from "react-router-dom"
export function Landing(){
    return <>
        <div className="min-h-screen flex flex-col-reverse md:flex-row md:justify-around items-center   bg-linear-to-r from-cyan-500 to-green-500">
            <div className="flex  justify-center items-center flex-col p-4">
                <h1 className="text-4xl text-white font-bold tracking-widest font-serif" >TaskFlow</h1>
                <div className="font-serif text-sm md:text-lg  text-white mt-4 max-w-lg">
                    Vous perdez trop de temps et d'énergie à jongler entre les post-it, 
                    les notes sur votre téléphone et les listes mentales ? <b>TaskFlow </b>centralise et simplifie tout. 
                    Grâce à son interface intuitive, 
                    elle réduit le stress mental, augmente votre concentration et vous fait gagner jusqu'à une heure par jour, 
                    pour reprendre enfin possession de votre temps.
                </div>
                    <Link to={'/Taches'} className="text-white  bg-linear-to-r from-green-500 to-cyan-500 hover:cursor-pointer p-4 rounded-md transition-all duration-700 mt-6 font-semibold shadow-md shadow-white/30 hover:shadow-white/60 transform hover:scale-105 ">
                        Essayer Maintenant
                    </Link>
            </div>
            <div>
                <img src='/task.webp' alt="TaskFlow" className="  " />
            </div>
        </div>
    </>
}
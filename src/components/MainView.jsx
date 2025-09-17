export const MainView = ({ imageUrl }) => {
    return (
        <div className="h-full">
            <div className="flex flex-col justify-end h-96 p-5 font-light rounded-t-lg opacity-90 bg-cover bg-[position:center_70%]" style={{ backgroundImage: `url(${imageUrl})` }}>
                <span className="flex items-center gap-2">
                    <i className="bi bi-patch-check-fill text-2xl text-[#4bb3ff]"></i>
                    <span className="text-sm">Certified Baller</span>
                </span>
                <h1 className="font-black text-8xl leading-[1.1]">Benjamin Sinek</h1>
                <span className="mt-3">0 lifetime visitors</span>
            </div>
        </div>
    )
}

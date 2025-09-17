export const MainView = ({ img, position, size, opacity }) => {
    return (
        <div className="h-full rounded-lg bg-spotify-grey">
            <div className="flex flex-col justify-end h-96 p-5 font-light rounded-t-lg"
                style={{
                    backgroundImage: `url(${img})`,
                    backgroundPosition: position,
                    backgroundSize: size,
                    opacity: opacity,
                }}>
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

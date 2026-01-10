export const Skills = () => {
    return (
        <section className="h-mainview">
            <div className="h-72 p-6 flex gap-6">
                <div className="h-full aspect-square rounded-lg bg-dark-grey"/>
                <div className="flex flex-col justify-end gap-2">
                    <span>Playlist</span>
                    <span className="text-8xl font-black">Skills</span>
                    <div className="flex gap-1 text-sm items-center mt-2">
                        <div className="h-6 aspect-square rounded-full bg-dark-grey mr-1"/>
                        <h2 className="font-semibold">Benjamin Sinek</h2>
                        <span className="text-light-grey font-bold">•</span>
                        <span className="text-light-grey font-light">24 skills</span>
                    </div>
                </div>
            </div>
            {/* CONTENT */}
            <div className="px-6">
                {/* development */}
                <section>
                    <div className="h-9 text-light-grey font-light px-4 flex items-center gap-4 border-b border-light-grey/20">
                        <span className="w-4 text-right">#</span>
                        <span className="flex-1 text-sm">Development</span>
                    </div>
                </section>
                
                {/* design */}
                <section>
                    <div className="h-9 text-light-grey font-light px-4 flex items-center gap-4 border-b border-light-grey/20">
                        <span className="w-4 text-right">#</span>
                        <span className="flex-1 text-sm">Design</span>
                    </div>
                </section>

                {/* admin */}
                <section>
                    <div className="h-9 text-light-grey font-light px-4 flex items-center gap-4 border-b border-light-grey/20">
                        <span className="w-4 text-right">#</span>
                        <span className="flex-1 text-sm">Admin</span>
                    </div>
                </section>
            </div>
        </section>
    )
}
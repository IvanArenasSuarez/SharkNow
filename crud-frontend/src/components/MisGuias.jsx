export default function MisGuias() {
    return(
        <>
        <div className="flex items-center justify-center h-screen">
        <div className="p-6 rounded-lg shadow-lg w-150 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Mis Guias</h1>
        <div className="flex items-center gap-2">
            <label className="input flex-grow flex items-center">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
            <input type="search" className="grow" placeholder="Buscar" />
            </label>
            <select defaultValue="Filtros" className="select w-50">
            <option disabled={true}>Pick a color</option>
            <option>Nombre</option>
            <option>Materia</option>
            <option>Velvet</option>
            </select>
        </div>

        <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide"></li>
            <li className="list-row">
                <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/></div>
                <div>
                <div>Dio Lupa</div>
                <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
                </div>
                <p className="list-col-wrap text-xs">
                "Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.
                </p>
                <button className="btn btn-square btn-ghost">
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"></path></g></svg>
                </button>
                <button className="btn btn-square btn-ghost">
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path  d="m4.5 12.75 6 6 9-13.5"></path></g></svg>
                </button>
            </li>
        </ul>
        <button className="btn btn-primary">Crear Guia de Estudio</button>
        </div>
        </div>
        </>
    );
}

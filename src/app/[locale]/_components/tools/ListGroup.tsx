export default function ListGroup(props:any) {
    
    return (
        <>
        <ul role="list" className="divide-y divide-gray-200 ">
            {props.data.map((data:any, index: number) => {
                return (
                    <li key={index}>
                        <a href="#" className="block hover:bg-gray-50 px-4 py-4 sm:px-6">
                            {data.name}
                        </a>
                    </li>
                )}
            )}
        </ul>
        </>
    );
}
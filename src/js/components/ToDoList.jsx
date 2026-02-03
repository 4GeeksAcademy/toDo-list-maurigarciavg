import React, { useState } from "react";


const ToDoList = () => {

	const [value, setValue] = useState("");
	const [list, setList] = useState([]);


	return (
		<div className="notebook-container">
			<div className="paper">
				<div className="rings">
					{[...Array(10)].map((element, item) => <div key={item} className="ring"></div>)}
				</div>
				<h1 className="text-center">Mis Notas</h1>
				<div className="newTask">
					<input
						type="text"
						placeholder="añadir nueva tarea"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {

								setList([...list, value])

								setValue("")


								console.log("Enter pulsado")
							}
						}} />



					<ul>
						{list.map((item, index) => (
							<li key={index}>
								<div className="listElement">{item}</div> <button className="delete" onClick={() =>
									setList(list.filter((element) => element !== item))}>X</button> </li>
						))}
					</ul>
					<p className="todo-footer mt-auto">{list.length} tareas pendientes</p>



				</div>
			</div>
		</div>
		

	);
};

export default ToDoList;
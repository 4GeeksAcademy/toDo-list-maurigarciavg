import React, { useState, useEffect } from "react";

const ToDoList = () => {
	const [value, setValue] = useState("");
	const [list, setList] = useState([]);
	const user = "maurigarciavg";

	const createUser = async () => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/users/${user}`, {
				method: "POST",
			});
			if (response.ok) {
				const data = await response.json();
				console.log("Usuario creado correctamente:", data);
			} else {
				console.log("Algo falló:", response.status);
			};
		} catch (error) {
			console.log("Error de red:", error);
		}
	};

	const getTasks = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/maurigarciavg");
			if (response.ok) {
				const data = await response.json();
				setList(data.todos);
				setValue("")
				console.log("Esta es la lista de tareas actual", data.todos);
			} else if (response.status === 404) {
				console.log("Ha habido un error:", response.status);
				createUser()
			} else {
				console.log("Ha habido un error:", response.status);
			};
		} catch (error) {
			console.log("Error de red:", error);
		};
	};

	const sendTasks = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/todos/maurigarciavg", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					label: value,
					is_done: false
				})
			});
			if (response.ok) {
				const data = await response.json();
				getTasks()

			} else {
				console.log("Algo falló:", response.status);
			}
		} catch (error) {
			console.log("Error de red:", error);
		}
	};

	const deleteTask = async (id) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE",
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				getTasks()

			} else {
				console.log("Algo falló:", response.status);
			}
		} catch (error) {
			console.log("Error de red:", error);
		}
	};

	useEffect(() => {
		getTasks();
	}, []);

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
								sendTasks()
							}
						}} />
					<ul>
						{list.map((item, index) => (
							<li key={index}>
								<div className="listElement">{item.label}</div>
								<button className="delete" onClick={() =>
									deleteTask(item.id)}>X</button>
							</li>
						))}
					</ul>
					<p className="todo-footer mt-auto">{list.length} tareas pendientes</p>
				</div>
			</div>
		</div>
	);
};

export default ToDoList;
"""
Day 29: System Architecture: The MVC Pattern
Practical Task: Build a modular Todo Application following strict Model-View-Controller structure.

Requirements:
- Implement TodoModel: stores lists, adds tasks, and deletes tasks.
- Implement TodoView: displays the lists and prompts the user for inputs.
- Implement TodoController: routes input calls from the view to modify the model, then updates the view.
- Structure MVC in a single clean Python file.
"""

class TodoModel:
    def __init__(self):
        self._todos = []

    def get_todos(self) -> list:
        return self._todos

    def add_todo(self, task: str) -> None:
        if task.strip():
            self._todos.append({"task": task.strip(), "completed": False})

    def delete_todo(self, index: int) -> bool:
        if 0 <= index < len(self._todos):
            self._todos.pop(index)
            return True
        return False

class TodoView:
    def show_todos(self, todos: list) -> None:
        print("\n--- TODO LIST ---")
        if not todos:
            print("  No tasks left!")
        else:
            for idx, item in enumerate(todos):
                status = "[X]" if item["completed"] else "[ ]"
                print(f"  {idx}: {status} {item['task']}")
        print("-----------------\n")

    def show_message(self, message: str) -> None:
        print(f"[*] {message}")

class TodoController:
    def __init__(self, model: TodoModel, view: TodoView):
        self.model = model
        self.view = view

    def add_task(self, task: str) -> None:
        self.model.add_todo(task)
        self.view.show_message(f"Added task: '{task}'")
        self.update_view()

    def remove_task(self, index: int) -> None:
        success = self.model.delete_todo(index)
        if success:
            self.view.show_message(f"Removed task at index {index}")
        else:
            self.view.show_message(f"Failed to remove task: invalid index {index}")
        self.update_view()

    def update_view(self) -> None:
        todos = self.model.get_todos()
        self.view.show_todos(todos)

if __name__ == "__main__":
    print("--- Testing Day 29: MVC Pattern ---")
    
    # Instantiate MVC components
    model = TodoModel()
    view = TodoView()
    controller = TodoController(model, view)
    
    # Simulate user interactions routing through the controller
    controller.add_task("Learn Design Patterns")
    controller.add_task("Review MVC Separation of Concerns")
    
    controller.remove_task(0)

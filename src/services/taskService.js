export const getTasks = async () => {
    const response = await fetch("/tasks.json");
    if (!response.ok) {
      throw new Error('Failed to load tasks');
    }
    return response.json();
}
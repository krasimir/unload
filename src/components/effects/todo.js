export default function manageTodo({ data, state }) {
  const editMode = state(false);

  data({
    editMode,
    toggleEditMode: editMode.mutate(value => !value)
  });
}

export async function handleNavigate(
  path: string,
  saveModel: () => Promise<void>,
  navigate: (path: string) => void
) {
  await saveModel();
  navigate(path);
}

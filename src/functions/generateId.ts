export default function generateId(objectsWithId: any[]): string {
  let id: string;
  const ids = objectsWithId.map((obj) => obj.id);
  
  do {
    id = Math.random().toString(36).substr(2, 9);
  } while (ids.includes(id));

  return id;
}
export default function CreatePackaging(packaging: Packaging) {
    return {
        id: packaging.id,
        title: packaging.title,
        descripcion: packaging.descripcion,
    }
}
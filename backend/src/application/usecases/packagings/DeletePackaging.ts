export default function CreatePackaging(packaging_id: number) {
    if (packaging_id === undefined) {
        return {
            'message': 'packaging_id no especificado.',
        }
    }
    return {
        'message': 'packaging eliminado.',
    }
}
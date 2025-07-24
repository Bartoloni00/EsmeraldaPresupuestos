export interface PackagingRepository {
    getAllorByID(packaging_id ?: number): Promise<any[]>;
}

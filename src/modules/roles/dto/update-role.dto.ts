import { z, ZodObject } from 'zod';

const UpdateRoleSchema = z.object({
    permission_ids: z.array(
        z.number({
            required_error: 'permission_ids is required',
            invalid_type_error: 'permission_ids must be an array',
        }),
    )
    .nonempty({
        message: 'At least one permission is required',
    }),
})

export class UpdateRoleDto {
    static schema: ZodObject<any> = UpdateRoleSchema

    constructor(public permission_ids: number[]) {}
}
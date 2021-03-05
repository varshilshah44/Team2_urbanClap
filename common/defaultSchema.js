exports.defaultSchema = (schema,options) => {
    schema.add({
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: Date
    })
}
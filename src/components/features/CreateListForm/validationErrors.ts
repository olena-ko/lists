export const validationErrors = {
    'noTitle': 'List name shouldn\'t be empty',
    'noElements': 'Add at least one element to the list'
}

export type ValidationErrorKey = keyof typeof validationErrors
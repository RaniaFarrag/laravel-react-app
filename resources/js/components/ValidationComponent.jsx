function validationComponent(errors, field) {
    // Check if there are errors for the specific field
    if (errors && errors[field]) {
        return errors[field].map((error, index) => (
            <div key={index} className="alert alert-danger">
                {error}
            </div>
        ));
    }
    return null; // Return null if no errors are found
}

export default validationComponent;

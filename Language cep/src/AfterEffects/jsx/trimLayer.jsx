function performe(data)
{
    try {
    
    
        return data.text;
    
    } catch (error) {
        return "Error: " + error.message;
    }
}
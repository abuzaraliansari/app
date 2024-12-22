import { StyleSheet } from 'react-native';

const AppStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#555',
  },
  input: {
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 10,
    fontSize: 20,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  picker: {
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 30,
  },
  pickerContainer: {
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  probutton:{
    marginBottom: 40,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
  },
  logoutButton: {
    backgroundColor: 'red',
  },

  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    marginVertical: 5,
    lineHeight: 22,
  },

  
});

export default AppStyles;

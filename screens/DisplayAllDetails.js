import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { FormDataContext } from '../contexts/FormDataContext';

const DisplayAllDetails = () => {
  const { formData } = useContext(FormDataContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Stored Details</Text>

        {/* Owner Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Owner Info</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Owner ID</Text>
              <Text style={styles.cell}>{formData.ownerID || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Property ID</Text>
              <Text style={styles.cell}>{formData.propertyID || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Created By</Text>
              <Text style={styles.cell}>{formData.createdBy || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Created By</Text>
              <Text style={styles.cell}>{formData.AdharNumber || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Photos Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Photos</Text>
          {formData.photos && formData.photos.length > 0 ? (
            formData.photos.map((photo, index) => (
              <View key={index} style={styles.photoContainer}>
                <Text style={styles.photoText}>Photo {index + 1}</Text>
                {photo.uri && (
                  <Image source={{ uri: photo.uri }} style={styles.photoPreview} />
                )}
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No photos available</Text>
          )}
        </View>

        {/* Family Members Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Family Members</Text>
          <View style={styles.table}>
            {formData.tenants && formData.tenants.length > 0 ? (
              formData.tenants.map((tenant, index) => (
                <View key={index} style={styles.tenantContainer}>
                  <Text style={styles.label}>Tenant {index + 1} Name: {tenant.name || 'N/A'}</Text>
                  {tenant.document && (
                    <Text style={styles.photoText}>
                      Document: {tenant.document.documentName || 'N/A'}
                    </Text>
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.noDataText}>No family members available</Text>
            )}
          </View>
        </View>

        {/* Property Area Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Property Area</Text>
          <View style={styles.table}>
            {/* Add property area details here */}
            <Text style={styles.noDataText}>No property area details available</Text>
          </View>
        </View>

        {/* Tenant Agreement Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Tenant Agreement</Text>
          <View style={styles.table}>
            {/* Add tenant agreement details here */}
            <Text style={styles.noDataText}>No tenant agreement details available</Text>
          </View>
        </View>

        {/* Special Considerations Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Special Considerations</Text>
          <View style={styles.table}>
            {/* Add special considerations details here */}
            <Text style={styles.noDataText}>No special considerations available</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  cellHeader: {
    fontWeight: 'bold',
    width: '50%',
    paddingHorizontal: 8,
    fontSize: 16,
  },
  cell: {
    width: '50%',
    paddingHorizontal: 8,
    fontSize: 16,
  },
  photoContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  photoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  photoPreview: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  tenantContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  noDataText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default DisplayAllDetails;
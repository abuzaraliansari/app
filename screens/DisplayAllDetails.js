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
        <Text style={styles.header}>check Details</Text>

        {/* Owner Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Owner Info</Text>
          <View style={styles.table}>
          <View style={styles.row}>
              <Text style={styles.cellHeader}>First Name</Text>
              <Text style={styles.cell}>{formData.firstName || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Middle Name</Text>
              <Text style={styles.cell}>{formData.middleName || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>last Name</Text>
              <Text style={styles.cell}>{formData.lastName || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Father Name</Text>
              <Text style={styles.cell}>{formData.FatherName || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Mobile Number</Text>
              <Text style={styles.cell}>{formData.mobileNumber || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Occupation</Text>
              <Text style={styles.cell}>{formData.occupation || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Age</Text>
              <Text style={styles.cell}>{formData.age || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Gender</Text>
              <Text style={styles.cell}>{formData.gender || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Income</Text>
              <Text style={styles.cell}>{formData.income || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Religion</Text>
              <Text style={styles.cell}>{formData.religion || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Category</Text>
              <Text style={styles.cell}>{formData.category || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Email</Text>
              <Text style={styles.cell}>{formData.Email || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Pan Card Number</Text>
              <Text style={styles.cell}>{formData.PanNumber || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Adhar Card Number</Text>
              <Text style={styles.cell}>{formData.AdharNumber || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Number Of Members</Text>
              <Text style={styles.cell}>{formData.NumberOfMembers || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Created By</Text>
              <Text style={styles.cell}>{formData.createdBy || 'N/A'}</Text>
            </View>
            {/* Add more owner details here */}
          </View>
        </View>

{/* Family Members Section */}
<View style={styles.section}>
  <Text style={styles.sectionHeader}>Family Members</Text>
  <View style={styles.table}>
    {formData.familyMembers && formData.familyMembers.length > 0 ? (
      formData.familyMembers.map((member, index) => (
        <View key={index} style={styles.tenantContainer}>
  <Text style={styles.label}>Family Member {index + 1}</Text>
  
  <View style={styles.row}>
    <Text style={styles.cellHeader}>First Name</Text>
    <Text style={styles.cell}>{member.FirstName || 'N/A'}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.cellHeader}>Last Name</Text>
    <Text style={styles.cell}>{member.LastName || 'N/A'}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.cellHeader}>Age</Text>
    <Text style={styles.cell}>{member.age || 'N/A'}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.cellHeader}>Gender</Text>
    <Text style={styles.cell}>{member.gender || 'N/A'}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.cellHeader}>Occupation</Text>
    <Text style={styles.cell}>{member.occupation || 'N/A'}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.cellHeader}>Relation</Text>
    <Text style={styles.cell}>{member.Relation || 'N/A'}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.cellHeader}>Created By</Text>
    <Text style={styles.cell}>{member.createdBy || 'N/A'}</Text>
  </View>
</View>
      ))
    ) : (
      <Text style={styles.noDataText}>No family members available</Text>
    )}
  </View>
</View>

        {/* Family Members Section
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
        </View> */}

{/* Property Area Section */}
<View style={styles.section}>
  <Text style={styles.sectionHeader}>Property Area</Text>
  <View style={styles.table}>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Galli Number</Text>
      <Text style={styles.cell}>{formData.galliNumber || 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Colony</Text>
      <Text style={styles.cell}>{formData.colony || 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Zone</Text>
      <Text style={styles.cell}>{formData.zone || 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Locality</Text>
      <Text style={styles.cell}>{formData.locality || 'N/A'}</Text>
    </View>
  </View>
</View>

{/* Property House Section */}
<View style={styles.section}>
  <Text style={styles.sectionHeader}>Property House</Text>
  <View style={styles.table}>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Property Mode</Text>
      <Text style={styles.cell}>{formData.propertyMode || 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Property Age</Text>
      <Text style={styles.cell}>{formData.propertyAge || 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Room Count</Text>
      <Text style={styles.cell}>{formData.roomCount || 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Floor Count</Text>
      <Text style={styles.cell}>{formData.floorCount || 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Shop Count</Text>
      <Text style={styles.cell}>{formData.shopCount || 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Open Area</Text>
      <Text style={styles.cell}>{formData.OpenArea || 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Constructed Area</Text>
      <Text style={styles.cell}>{formData.ConstructedArea || 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Tenants</Text>
      <Text style={styles.cell}>{formData.tenants ? formData.tenants.length : 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Tenant Count</Text>
      <Text style={styles.cell}>{formData.tenantCount || 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Tenant Yearly Rent</Text>
      <Text style={styles.cell}>{formData.TenantYearlyRent || 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>House Type</Text>
      <Text style={styles.cell}>{formData.HouseType || 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>House Number</Text>
      <Text style={styles.cell}>{formData.houseNumber || 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Water Harvesting</Text>
      <Text style={styles.cell}>{formData.waterHarvesting || 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Submersible</Text>
      <Text style={styles.cell}>{formData.submersible || 'N/A'}</Text>
    </View>
    {/* <View style={styles.row}>
      <Text style={styles.cellHeader}>Bank Account Number</Text>
      <Text style={styles.cell}>{formData.bankAccountNumber || 'N/A'}</Text>
    </View> */}
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Consent</Text>
      <Text style={styles.cell}>{formData.consent || 'N/A'}</Text>
    </View>
  </View>
</View>

        {/* Special Considerations Section */}
<View style={styles.section}>
  <Text style={styles.sectionHeader}>Special Considerations</Text>
  <View style={styles.table}>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Consideration Type</Text>
      <Text style={styles.cell}>{formData.considerationType || 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Description</Text>
      <Text style={styles.cell}>{formData.description || 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Latitude</Text>
      <Text style={styles.cell}>{formData.latitude || 'N/A'}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Longitude</Text>
      <Text style={styles.cell}>{formData.longitude || 'N/A'}</Text>
    </View>
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
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 10,
  },
  sectionHeader: {
    fontSize: 30,
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
    fontSize: 19,
  },
  cell: {
    width: '50%',
    paddingHorizontal: 8,
    fontSize: 18,
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
    fontSize: 20,
    fontWeight: 'bold',
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
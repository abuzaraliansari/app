import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import AppStyles from '../styles/AppStyles';
import { FormDataContext } from '../contexts/FormDataContext';

const DisplayAllDetails = () => {
  const { formData } = useContext(FormDataContext);

  return (
    <ScrollView style={AppStyles.displayContainer}>
    <View style={AppStyles.displayContent}>
      <Text style={AppStyles.displayHeader}>Check Details</Text>

      {/* Owner Information Section */}
      <View style={AppStyles.displaySection}>
        <Text style={AppStyles.displaySectionHeader}>Owner Info</Text>
        <View style={AppStyles.displayTable}>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>First Name</Text>
            <Text style={AppStyles.displayCell}>{formData.firstName || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Middle Name</Text>
            <Text style={AppStyles.displayCell}>{formData.middleName || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Last Name</Text>
            <Text style={AppStyles.displayCell}>{formData.lastName || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Father Name</Text>
            <Text style={AppStyles.displayCell}>{formData.FatherName || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Mobile Number</Text>
            <Text style={AppStyles.displayCell}>{formData.mobileNumber || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Occupation</Text>
            <Text style={AppStyles.displayCell}>{formData.occupation || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Age</Text>
            <Text style={AppStyles.displayCell}>{formData.age || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Gender</Text>
            <Text style={AppStyles.displayCell}>{formData.gender || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Income</Text>
            <Text style={AppStyles.displayCell}>{formData.income || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Religion</Text>
            <Text style={AppStyles.displayCell}>{formData.religion || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Category</Text>
            <Text style={AppStyles.displayCell}>{formData.category || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Email</Text>
            <Text style={AppStyles.displayCell}>{formData.Email || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Pan Card Number</Text>
            <Text style={AppStyles.displayCell}>{formData.PanNumber || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Adhar Card Number</Text>
            <Text style={AppStyles.displayCell}>{formData.AdharNumber || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Number Of Members</Text>
            <Text style={AppStyles.displayCell}>{formData.NumberOfMembers || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Created By</Text>
            <Text style={AppStyles.displayCell}>{formData.createdBy || 'N/A'}</Text>
          </View>
        </View>
      </View>

      {/* Family Members Section */}
      <View style={AppStyles.displaySection}>
        <Text style={AppStyles.displaySectionHeader}>Family Members</Text>
        <View style={AppStyles.displayTable}>
          {formData.familyMembers && formData.familyMembers.length > 0 ? (
            formData.familyMembers.map((member, index) => (
              <View key={index} style={AppStyles.displayTenantContainer}>
                <Text style={AppStyles.displayLabel}>Family Member {index + 1}</Text>
                <View style={AppStyles.displayRow}>
                  <Text style={AppStyles.displayCellHeader}>First Name</Text>
                  <Text style={AppStyles.displayCell}>{member.FirstName || 'N/A'}</Text>
                </View>
                <View style={AppStyles.displayRow}>
                  <Text style={AppStyles.displayCellHeader}>Last Name</Text>
                  <Text style={AppStyles.displayCell}>{member.LastName || 'N/A'}</Text>
                </View>
                <View style={AppStyles.displayRow}>
                  <Text style={AppStyles.displayCellHeader}>Age</Text>
                  <Text style={AppStyles.displayCell}>{member.age || 'N/A'}</Text>
                </View>
                <View style={AppStyles.displayRow}>
                  <Text style={AppStyles.displayCellHeader}>Gender</Text>
                  <Text style={AppStyles.displayCell}>{member.gender || 'N/A'}</Text>
                </View>
                <View style={AppStyles.displayRow}>
                  <Text style={AppStyles.displayCellHeader}>Occupation</Text>
                  <Text style={AppStyles.displayCell}>{member.occupation || 'N/A'}</Text>
                </View>
                <View style={AppStyles.displayRow}>
                  <Text style={AppStyles.displayCellHeader}>Relation</Text>
                  <Text style={AppStyles.displayCell}>{member.Relation || 'N/A'}</Text>
                </View>
                <View style={AppStyles.displayRow}>
                  <Text style={AppStyles.displayCellHeader}>Created By</Text>
                  <Text style={AppStyles.displayCell}>{member.createdBy || 'N/A'}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={AppStyles.displayNoDataText}>No family members available</Text>
          )}
        </View>
      </View>

      {/* Property Area Section */}
      <View style={AppStyles.displaySection}>
        <Text style={AppStyles.displaySectionHeader}>Property Area</Text>
        <View style={AppStyles.displayTable}>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Galli Number</Text>
            <Text style={AppStyles.displayCell}>{formData.galliNumber || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Colony</Text>
            <Text style={AppStyles.displayCell}>{formData.colony || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Zone</Text>
            <Text style={AppStyles.displayCell}>{formData.zone || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Locality</Text>
            <Text style={AppStyles.displayCell}>{formData.locality || 'N/A'}</Text>
          </View>
        </View>
      </View>

{/* Property House Section */}
<View style={AppStyles.displaySection}>
          <Text style={AppStyles.displaySectionHeader}>Property House</Text>
          <View style={AppStyles.displayTable}>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Property Mode</Text>
              <Text style={AppStyles.displayCell}>{formData.propertyMode || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Property Age</Text>
              <Text style={AppStyles.displayCell}>{formData.propertyAge || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Room Count</Text>
              <Text style={AppStyles.displayCell}>{formData.roomCount || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Floor Count</Text>
              <Text style={AppStyles.displayCell}>{formData.floorCount || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Shop Count</Text>
              <Text style={AppStyles.displayCell}>{formData.shopCount || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Open Area</Text>
              <Text style={AppStyles.displayCell}>{formData.OpenArea || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Constructed Area</Text>
              <Text style={AppStyles.displayCell}>{formData.ConstructedArea || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Tenants</Text>
              <Text style={AppStyles.displayCell}>{formData.tenants ? formData.tenants.length : 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Tenant Count</Text>
              <Text style={AppStyles.displayCell}>{formData.tenantCount || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Tenant Yearly Rent</Text>
              <Text style={AppStyles.displayCell}>{formData.TenantYearlyRent || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>House Type</Text>
              <Text style={AppStyles.displayCell}>{formData.HouseType || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>House Number</Text>
              <Text style={AppStyles.displayCell}>{formData.houseNumber || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Water Harvesting</Text>
              <Text style={AppStyles.displayCell}>{formData.waterHarvesting || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Submersible</Text>
              <Text style={AppStyles.displayCell}>{formData.submersible || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Consent</Text>
              <Text style={AppStyles.displayCell}>{formData.consent || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Special Considerations Section */}
        <View style={AppStyles.displaySection}>
          <Text style={AppStyles.displaySectionHeader}>Special Considerations</Text>
          <View style={AppStyles.displayTable}>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Consideration Type</Text>
              <Text style={AppStyles.displayCell}>{formData.considerationType || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Description</Text>
              <Text style={AppStyles.displayCell}>{formData.description || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Latitude</Text>
              <Text style={AppStyles.displayCell}>{formData.latitude || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Longitude</Text>
              <Text style={AppStyles.displayCell}>{formData.longitude || 'N/A'}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DisplayAllDetails;
export function validateStaffMemberInput(staffMember){
    if (staffMember.firstName.length >= 26 )
    {
        return false;
    }
    else if (staffMember.firstName == null)
    {
        return false;
    }
    else if (staffMember.lastName >= 26 )
    {
        return false;
    }
    else if (staffMember.lastName == null)
    {
        return false;
    }

    return true;
}

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

export function mapJobsToJobMap(jobs){
    return jobs.map(e => ({
        title: e.title, apiId: e.id, id: e.id.toString()
    }));
}

export function mapApprovedStaffMembersForDropdown(staffMembers){
    return staffMembers.map(s => {
        return { 
        value: s.id, 
        text: s.staffMemberName
        };
    });
}

export function mapJobsForDropdown(jobs){
    return jobs.map(j => {
        return {
            value: j.id,
            text: j.title
        };
    });
}

export function mapStaffForDropDown(staff){
    return staff.map(s => {
        return {
            value: s.id,
            text: s.firstName + " " + s.lastName
        };
    });
}
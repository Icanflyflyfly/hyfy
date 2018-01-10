package com.bhtec.domain.pojo.seal;

import java.sql.Timestamp;

/**
 * Created by jacobllpjacobllp on 2017/8/23.
 */
public class SealUnitEntity {
    private long sealUnitId;
    private String unitName;
    private String unitNamePy;
    private String companyType;
    private String area;
    private String licenseNo;
    private String manager;
    private String phone;
    private String address;
    private String areaName;
    private String creator;
    private String status;
    private Timestamp createDate;

    public long getSealUnitId() {
        return sealUnitId;
    }

    public void setSealUnitId(long sealUnitId) {
        this.sealUnitId = sealUnitId;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public String getUnitNamePy() {
        return unitNamePy;
    }

    public void setUnitNamePy(String unitNamePy) {
        this.unitNamePy = unitNamePy;
    }

    public String getCompanyType() {
        return companyType;
    }

    public void setCompanyType(String companyType) {
        this.companyType = companyType;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getLicenseNo() {
        return licenseNo;
    }

    public void setLicenseNo(String licenseNo) {
        this.licenseNo = licenseNo;
    }

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Timestamp createDate) {
        this.createDate = createDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SealUnitEntity that = (SealUnitEntity) o;

        if (sealUnitId != that.sealUnitId) return false;
        if (unitName != null ? !unitName.equals(that.unitName) : that.unitName != null) return false;
        if (unitNamePy != null ? !unitNamePy.equals(that.unitNamePy) : that.unitNamePy != null) return false;
        if (companyType != null ? !companyType.equals(that.companyType) : that.companyType != null) return false;
        if (area != null ? !area.equals(that.area) : that.area != null) return false;
        if (licenseNo != null ? !licenseNo.equals(that.licenseNo) : that.licenseNo != null) return false;
        if (manager != null ? !manager.equals(that.manager) : that.manager != null) return false;
        if (phone != null ? !phone.equals(that.phone) : that.phone != null) return false;
        if (address != null ? !address.equals(that.address) : that.address != null) return false;
        if (areaName != null ? !areaName.equals(that.areaName) : that.areaName != null) return false;
        if (creator != null ? !creator.equals(that.creator) : that.creator != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;
        if (createDate != null ? !createDate.equals(that.createDate) : that.createDate != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (sealUnitId ^ (sealUnitId >>> 32));
        result = 31 * result + (unitName != null ? unitName.hashCode() : 0);
        result = 31 * result + (unitNamePy != null ? unitNamePy.hashCode() : 0);
        result = 31 * result + (companyType != null ? companyType.hashCode() : 0);
        result = 31 * result + (area != null ? area.hashCode() : 0);
        result = 31 * result + (licenseNo != null ? licenseNo.hashCode() : 0);
        result = 31 * result + (manager != null ? manager.hashCode() : 0);
        result = 31 * result + (phone != null ? phone.hashCode() : 0);
        result = 31 * result + (address != null ? address.hashCode() : 0);
        result = 31 * result + (areaName != null ? areaName.hashCode() : 0);
        result = 31 * result + (creator != null ? creator.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (createDate != null ? createDate.hashCode() : 0);
        return result;
    }
}

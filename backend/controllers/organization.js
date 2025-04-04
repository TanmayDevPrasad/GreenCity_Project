import Organization from '../models/organization.js';
import bcrypt from 'bcrypt';

export const signupOrganization = async (req, res) => {
    try {
        const { organizationName, address, organizationId, email, phone, password } = req.body;

        // Check if organization already exists
        const existingOrganization = await Organization.findOne({ 
            $or: [
                { email }, 
                { phone }, 
                { organizationId }
            ] 
        });
        if (existingOrganization) {
            return res.status(400).json({ message: 'Organization already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new organization
        const newOrganization = new Organization({ 
            organizationName: organizationName, 
            address: address, 
            organizationId: organizationId, 
            email: email, 
            phone: phone, 
            password: hashedPassword 
        });
        await newOrganization.save();


        res.status(201).json({ message: 'Organization registered successfully', organization: {
            _id: newOrganization._id,
            organizationName: newOrganization.organizationName,
            organizationId: newOrganization.organizationId,
            email: newOrganization.email,
            phone: newOrganization.phone
        } });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up organization', error: error.message });
    }
};

export const loginOrganization = async (req, res) => {
    try {
        const { organizationId, password } = req.body;

        // Find organization by organizationId
        const organization = await Organization.findOne({ organizationId });
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, organization.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', organization: {
            _id: organization._id,
            organizationName: organization.organizationName,
            organizationId: organization.organizationId,
            email: organization.email,
            phone: organization.phone
        } });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in organization', error: error.message });
    }
};
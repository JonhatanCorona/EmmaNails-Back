import { CredentialModule } from "../config/data-source";
import { Credential } from "../entities/Credential";

const createCredentials = async (username: string, password: string): Promise<number> => {
    const newCredential = new Credential();
    newCredential.id,
    newCredential.username = username;
    newCredential.password = password;

    const credentialRepository = CredentialModule;
    const savedCredential = await credentialRepository.save(newCredential);

    return savedCredential.id;
};

const validateCredentials = async (username: string, password: string): Promise<number | null> => {
    const credentials = await CredentialModule.findOne({
        where: { username },
    });

    if (!credentials) {
        return null;
    }
    if (credentials.password !== password) {
        return null;
    }

    return credentials.id;
};

export {createCredentials, validateCredentials}
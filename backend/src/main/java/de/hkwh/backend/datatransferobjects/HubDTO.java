package de.hkwh.backend.datatransferobjects;

public record HubDTO(
        long h_id,
        String hubName,
        String address,
        String manager
) {
}

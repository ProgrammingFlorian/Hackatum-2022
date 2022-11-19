package de.hkwh.backend.datatransferobjects;

public record DashboardDTO(
        WallboxDTO[] wallboxes,
        TaskDTO[] tasks
) {
    public static DashboardDTO of (WallboxDTO[] wallboxes, TaskDTO[] tasks)
    {
        return new DashboardDTO(
                wallboxes, tasks
        );
    }
}

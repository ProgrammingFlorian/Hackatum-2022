import { VehicleInfoDTO } from "../model/VehicleInfoDTO"

interface VehicleInfoModalProps {
    vehicleInfo?: VehicleInfoDTO;
}

/**
 * Component that pops up when clicking on any car or checking in a car by qr code.
 */
const VehicleInfoModal = (props: VehicleInfoModalProps) => {

    return (
        // todo: display the info stored in the props like in figma
        <div className="modal modal-tour position-static d-block bg-secondary py-5" tabIndex={-1} role="dialog" id="modalTour"> only for debugging! this background div should be deleted once embedded
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-4 shadow bg-dark">
                    <div className="modal-body p-5">
                        <div className="float-end">
                            <img src="audi-logo.png" alt="Logo" height={40} width={110} />
                        </div>

                        <ul className="d-grid gap-4 my-5 list-unstyled text-primary">
                            <li className="d-flex gap-4">
                                <svg className="bi text-muted flex-shrink-0" width="48" height="48"><use xlinkHref="#grid-fill" /></svg>
                                <div>
                                    <h5 className="mb-0 color-white">Grid view</h5>
                                    Not into lists? Try the new grid view.
                                </div>
                            </li>
                            <li className="d-flex gap-4">
                                <svg className="bi text-warning flex-shrink-0" width="48" height="48"><use xlinkHref="#bookmark-star" /></svg>
                                <div>
                                    <h5 className="mb-0">Bookmarks</h5>
                                    Save items you love for easy access later.
                                </div>
                            </li>
                            <li className="d-flex gap-4">
                                <svg className="bi text-primary flex-shrink-0" width="48" height="48"><use xlinkHref="#film" /></svg>
                                <div>
                                    <h5 className="mb-0">Video embeds</h5>
                                    Share videos wherever you go.
                                </div>
                            </li>
                        </ul>
                        <button type="button" className="btn btn-lg btn-primary mt-5 w-100" data-bs-dismiss="modal">Great, thanks!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VehicleInfoModal
/**
 * 产品文案 —— 后台 description/shortDescription 为空时的兜底内容。
 * 由内容审计补齐:按 slug 索引,每个产品一份独一无二的文案,
 * 锚定型号所对应的行业标准互换系列(NG6/NG10 安装面、Yuken/Rexroth 互换),
 * 避免全站产品页共用一段模板文字(重复内容对 Google 收录是减分项)。
 * 后台补齐真实描述后优先使用后台数据(见产品页 product.description || copy.long)。
 */
export interface ProductCopy {
  /** 一句话摘要:meta description / 页面副文案 */
  short: string;
  /** 详情页 Product Description 正文 */
  long: string;
}

export function getProductCopy(slug: string): ProductCopy | undefined {
  return productContent[slug];
}

export const productContent: Record<string, ProductCopy> = {
  "dsg-solenoid-directional-valve-01": {
    short:
      "DSG-01 solenoid directional valve — NG6 (CETOP 3) subplate mounting, Yuken DSG-01 interchange, 2- and 3-position spools with AC/DC coils.",
    long: `The DSG-01 series is a wet-armature solenoid directional valve on the NG6 (CETOP 3, ISO 4401-03) mounting interface — a direct interchange for the Yuken DSG-01 and cross-compatible with 4WE6 / DG4V-3 platforms. Spool options cover the full range of common circuits: 2B2 and 2B3 two-position, spring-offset types, 3C2/3C3/3C4 three-position, spring-centered types, plus the 3C60 and other specialized functions. Coils are available in 12/24 VDC and 110/220 VAC with a standard DIN connector.

Rated for 31.5 MPa (315 bar) and flows up to 63 L/min, the DSG-01 body is machined from certified cast iron and paired with a hardened, ground spool for low internal leakage and long switching life. Typical applications include small hydraulic power units, injection molding machines, press brakes, machine tools and mobile attachments.

Every DSG-01 leaves the factory only after an individual pressure and function test. Export orders include anti-rust treatment, port protection and full documentation — send us your spool code and coil voltage for a quotation within 24 hours.`,
  },

  "dsg-solenoid-directional-valve-03": {
    short:
      "DSG-03 solenoid directional valve — NG10 (ISO 4401-05) mounting, Yuken DSG-03 interchange, up to 120 L/min.",
    long: `The DSG-03 series scales the proven DSG solenoid valve design up to the NG10 (ISO 4401-05) mounting interface, with rated flow around 120 L/min at 31.5 MPa (315 bar). As a drop-in interchange for the Yuken DSG-03, it covers 2B2/2B3 two-position and 3C2/3C3/3C4/3C60 three-position spool functions, with 12/24 VDC or 110/220 VAC wet-armature coils.

The larger flow capacity makes DSG-03 the standard choice for main directional control in presses, steel plant auxiliary circuits, testing rigs and industrial power units where an NG6 valve would run at its limit. The valve is built on a precision-machined cast-iron body with hardened, ground spools for low leakage across the full pressure range.

Each valve is pressure-tested and solenoid-cycled on the bench before packing; anti-rust treatment and export cartons are standard. Mixed-model orders with DSG-01 and modular valves ship in one container — ask for the datasheet and outline drawing with your inquiry.`,
  },

  "4we-solenoid-directional-valve-06": {
    short:
      "4WE6 solenoid directional valve — NG6 (CETOP 3), Bosch Rexroth 4WE6 interchange, 315 bar class, E/J/G/H spool variants.",
    long: `The 4WE6 series is a Bosch Rexroth-pattern solenoid directional valve on the NG6 (CETOP 3, ISO 4401-03) interface, interchangeable with 4WE6, DSG-01 and DG4V-3 series valves. Standard spool symbols (E, J, G, H, M, U and more) map directly onto the Rexroth ordering system, so an existing bill of materials transfers without re-engineering the circuit.

The valve is rated for 315 bar with maximum flow of 60–80 L/min depending on spool type, using a wet-armature solenoid with 12/24 VDC or 110/220 VAC coils. Machined cast-iron body, hardened and ground spools, and a long-life solenoid assembly keep internal leakage and coil failures out of the field.

Applications span machine tools, press brakes, shears, and industrial power units worldwide. Every valve is individually pressure- and function-tested before it earns the VEYDOR mark, and ships with anti-rust treatment and export packing. State your Rexroth ordering code — we quote the direct equivalent within 24 hours.`,
  },

  "4we-solenoid-directional-valve-10": {
    short:
      "4WE10 solenoid directional valve — NG10 (ISO 4401-05), Bosch Rexroth 4WE10 interchange, up to 120 L/min at 315 bar.",
    long: `The 4WE10 series brings Rexroth-pattern solenoid directional control to the NG10 (ISO 4401-05) interface — the direct interchange for 4WE10 and DSG-03 valves, rated up to 120 L/min at 315 bar. Standard E/J/G/H/M/U spool symbols match the Rexroth ordering system one-to-one, with 12/24 VDC and 110/220 VAC coil options.

At NG10 flow levels the valve handles the main directional functions of larger presses, injection molding machines, steel plant auxiliaries and industrial power units, where a single 4WE10 replaces the parallel piping of smaller valves. The cast-iron body is machined to tight bore tolerances and the spool is hardened and ground for consistent shift performance over millions of cycles.

Every unit is pressure-tested on a calibrated bench and solenoid-cycled before packing; export orders ship with anti-rust treatment and full documentation. OEM customers can order private labeling and customer part numbers — send your drawing or Rexroth code for a quotation within 24 hours.`,
  },

  "modular-relief-valve-01": {
    short:
      "Modular (stacking) relief valve, NG6 — MBA/MBB/MBP-01 series, mounts directly under a CETOP 3 solenoid valve.",
    long: `The MBA/MBB/MBP-01 series is a modular relief valve that stacks directly beneath an NG6 (CETOP 3) directional valve, protecting the branch circuit without extra piping. The pilot-operated main stage keeps pressure override low even as flow changes, so the protected pressure stays stable across the duty cycle.

The three variants cover different system needs: MBP-01 is the basic stacking relief, MBA-01 adds a solenoid vent for pump unloading, and MBB-01 supports two-pressure and unloading functions where the circuit switches between working and idle states. All three share the standard ISO 4401-03 stacking interface and seat into an existing NG6 stack in minutes.

For distributors this is a fast-moving spare: the MBP/MBA/MBB series interchanges directly with the Yuken modular relief line. Every valve is individually pressure-tested before packing, and mixed-model cartons with DSG-01 valves are standard. Ask for the full stacking diagram and adjustment ranges with your quote.`,
  },

  "modular-relief-valve-03": {
    short:
      "Modular (stacking) relief valve, NG10 — MBA/MBB/MBP-03 series for CETOP 5 stacks.",
    long: `The MBA/MBB/MBP-03 series is the NG10 (CETOP 5) version of the modular relief family: a stacking relief valve that mounts directly beneath an NG10 directional valve and protects the branch without one meter of extra piping. The pilot-operated design gives a flat pressure characteristic, so the setting holds steady from minimum to maximum flow.

MBP-03 is the standard stacking relief; MBA-03 and MBB-03 add solenoid vent and multi-pressure capability for unloading and two-pressure circuits. The ISO 4401-05 stacking interface matches the Yuken modular relief series, making it a drop-in spare for existing NG10 stacks in presses, injection molding machines and industrial power units.

Each valve is pressure-tested individually on a calibrated bench before it ships with anti-rust treatment and export packing. If your customer's system uses MBP/MBA/MBB-03, we can supply the complete stack — relief, check, throttle and directional valve — in one mixed-model order.`,
  },

  "modular-check-valve-01": {
    short:
      "Modular check valve, NG6 — MCA/MCB/MCT/MCP-01 variants for A, B, P and T lines in a stacking circuit.",
    long: `The MCA/MCB/MCT/MCP-01 series places a zero-leakage check element inside the NG6 (CETOP 3) stack, where it replaces a line-mounted check valve and its fittings. Four port variants cover every position in the circuit: MCA-01 for the A line, MCB-01 for the B line, MCP-01 for the pump (P) line and MCT-01 for the tank (T) line.

This matters where flow must be blocked in one direction with no leak-by: holding a loaded cylinder, protecting a pump from reverse flow, sequencing actuators, or isolating branches that share one power unit. The poppet-and-seat design keeps leakage effectively zero under full system pressure, which a spool check cannot guarantee.

Stacking under a DSG-01 or 4WE6 directional valve, the MC series interchanges with the Yuken modular check line. Every valve is pressure-tested before packing; mixed-model orders across the full modular range ship in one carton. Tell us your circuit position (A/B/P/T) and pressure — we quote within 24 hours.`,
  },

  "modular-check-valve-03": {
    short:
      "Modular check valve, NG10 — MCA/MCB/MCT/MCP-03 variants for A, B, P and T lines in CETOP 5 stacks.",
    long: `The MCA/MCB/MCT/MCP-03 series brings the modular check concept to NG10 (CETOP 5) stacks: a poppet check valve integrated into the stacking interface, available for the A, B, P and T lines. In larger systems the piping a modular check replaces is longer, heavier and leak-prone, so the saving in fittings and potential failure points is even greater than on the NG6 size.

MCA-03 and MCB-03 hold actuator loads without drift; MCP-03 shields the pump from reverse flow and pressure shocks; MCT-03 maintains a controlled back pressure on the return line. The poppet-and-seat construction seals to near-zero leakage at full system pressure — the property load-holding circuits are bought for.

The series interchanges with the Yuken modular check line on the standard ISO 4401-05 interface. Each valve is individually tested before export packing with anti-rust treatment. Build a complete NG10 stack from one supplier — relief, check, throttle and directional valve — and reduce your landed cost per function.`,
  },

  "modular-throttle-valve-01": {
    short:
      "Modular throttle valve, NG6 — MSP-01 stack-mounted flow control for CETOP 3 systems.",
    long: `The MSP-01 series is a modular throttle valve for NG6 (CETOP 3) stacking systems: a precision adjustable orifice in the P line of the stack, tuned with a knob or lockable adjusting screw. Mounting it directly beneath the directional valve removes the need for a separate flow-control valve, its subplate and the piping between them.

The throttle is graduated and lockable, so a setting survives vibration and can be re-established after service by reading the dial. In speed-control circuits it meters the full branch flow; combined with a modular check valve it becomes a meter-in/meter-out station in a few millimetres of stack height.

The MSP series interchanges with the Yuken modular throttle line on the ISO 4401-03 interface. Every valve is pressure-tested before packing with anti-rust treatment and port protection. Distributors often order MSP-01 together with MSW-01 and the MBP-01 relief to cover every flow-control spare in one shipment — ask us for a package quotation.`,
  },

  "modular-throttle-valve-03": {
    short:
      "Modular throttle valve, NG10 — MSP-03 stack-mounted flow control for CETOP 5 systems.",
    long: `The MSP-03 series is the NG10 (CETOP 5) modular throttle: an adjustable orifice that lives in the stack itself, beneath the directional valve, instead of in a separate flow-control valve with its own subplate and piping. On larger systems the plumbing saved is substantial, and with it the fittings that eventually loosen and leak.

The throttle element is graduated and lockable, giving repeatable speed settings across shift changes and services. In NG10 circuits it meters branch flow for feed cylinders, rotary drives and auxiliary motions where a fixed orifice cannot be changed quickly enough on-site.

Mounting on the standard ISO 4401-05 interface, the MSP-03 interchanges with the Yuken modular throttle line. Each valve is individually pressure-tested before export packing. For systems that need throttle plus free reverse flow, pair it with the MSW-03 throttle-and-check — both are quoted together within 24 hours.`,
  },

  "modular-throttle-check-valve-01": {
    short:
      "Modular throttle & check valve, NG6 — MSW-01: metered flow one way, free flow the other, in one stack element.",
    long: `The MSW-01 series combines a throttle and a check valve in a single NG6 (CETOP 3) stacking element: flow is metered in one direction through the adjustable orifice and returns freely through the check in the other. That dual behavior is exactly what meter-out feed control needs — controlled advance, fast return — without buying two valves and their subplates.

Like the MSP-01 throttle it sits directly beneath the directional valve in the stack, so a complete speed-control station adds only millimetres of stack height and no piping. The adjustment is graduated and lockable, and the check is a poppet type with near-zero reverse leakage.

The MSW series interchanges with the Yuken modular throttle-and-check line on the ISO 4401-03 interface. Every valve is pressure-tested before packing with anti-rust treatment. Order MSW-01 together with MSP-01 and the MC check series in one mixed-model shipment — quote within 24 hours.`,
  },

  "modular-throttle-check-valve-03": {
    short:
      "Modular throttle & check valve, NG10 — MSW-03: metered flow one way, free flow the other, in one stack element.",
    long: `The MSW-03 series is the NG10 (CETOP 5) throttle-and-check module: an adjustable orifice for metered flow in one direction with a free-flow check in the reverse direction, both inside the stacking interface beneath the directional valve. For feed motions on larger cylinders — controlled advance, fast return — it replaces a separate flow-control valve, its subplate and the piping between them.

The throttle adjustment is graduated and lockable, and the check is a poppet design with near-zero leakage in the free-flow direction. Inside the stack the MSW-03 keeps the pressure drop where it belongs — at the orifice, not scattered through fittings and elbows.

Interchangeable with the Yuken modular throttle-and-check line on ISO 4401-05, the MSW-03 is individually pressure-tested before export packing. Combine it with MSP-03, MBP-03 and the MC check series to supply a complete NG10 stack from one source with one warranty.`,
  },

  "modular-reducing-pressure-valve-01": {
    short:
      "Modular pressure reducing valve, NG6 — MRA-01 (A line), MRP-01 (P line), MRB-01 (B line) for CETOP 3 stacks.",
    long: `The MRA/MRP/MRB-01 series is a modular pressure reducing valve for NG6 (CETOP 3) stacks: it holds a branch at a pressure lower than the main system pressure, mounted directly beneath the directional valve instead of on its own subplate. Three variants route the reduced pressure where the circuit needs it — MRA-01 on the A line, MRP-01 on the P line, MRB-01 on the B line.

The pilot-operated design keeps the reduced pressure stable as the branch flow changes, which spring-only reducing elements cannot do. Typical duties: clamping circuits that must hold force without crushing the workpiece, pilot supply lines, brake release circuits and any branch that needs a lower, steady pressure than the main relief setting.

The series interchanges with the Yuken modular reducing line on the ISO 4401-03 interface. Every valve is individually pressure-tested before packing; anti-rust treatment and export cartons are standard. Send your circuit pressure and required reduced pressure — quotation within 24 hours.`,
  },

  "modular-reducing-pressure-valve-03": {
    short:
      "Modular pressure reducing valve, NG10 — MRA-03 (A line), MRP-03 (P line), MRB-03 (B line) for CETOP 5 stacks.",
    long: `The MRA/MRP/MRB-03 series is the NG10 (CETOP 5) modular pressure reducing valve: it holds a branch of a large system at a controlled lower pressure, stacked directly beneath the NG10 directional valve. MRA-03 reduces the A line, MRP-03 the P line and MRB-03 the B line, covering every position a reducing function appears in practice.

In heavy systems the reduced-pressure branch often carries real flow — large clamping cylinders, counterbalance supplies, brake and pilot circuits — and the pilot-operated design keeps the setting steady across that flow range. The alternative, a line-mounted reducing valve with its own subplate and piping, costs more in fittings, space and leak points than the modular element.

Interchangeable with the Yuken modular reducing series on ISO 4401-05, each MRA/MRP/MRB-03 is pressure-tested individually before export packing. Pair it with our MB series relief valves to supply a complete pressure-control stack from one manufacturer.`,
  },

  "pilot-operated-relief-valve-03": {
    short:
      "Pilot-operated relief valve — BT-03 (threaded) / BG-03 (subplate), Yuken BT/BG-03 interchange, optional solenoid vent.",
    long: `The BT-03 / BG-03 series is a pilot-operated relief valve for main-system pressure protection — the valve that stands between your power unit and a burst hose. The pilot stage controls a large main poppet, so the pressure-versus-flow curve stays flat: the setting holds from idle flow to full flow with minimal pressure override, and the valve reseats tightly near the set point.

Two mounting styles cover every installation: BT-03 with pipe-thread ports for line mounting, and BG-03 on the standard ISO 6264 subplate for manifold systems. The S-BT/S-BG variants add a solenoid vent that dumps the pilot stage on command — the standard way to unload a pump at idle or switch between two pressure levels in accumulator and two-pressure circuits.

Interchanging with the Yuken BT/BG-03 series, the valve is individually pressure-tested on a calibrated bench before packing with anti-rust treatment. Typical duties span presses, injection molding machines, steel plant auxiliaries and marine deck machinery — send your flow and pressure setting for a quotation within 24 hours.`,
  },

  "solenoid-relief-valve-06": {
    short:
      "Solenoid-controlled relief valve BSG-06 (subplate) / BST-06 (threaded) — pump unloading and two-pressure circuits.",
    long: `The BSG-06 / BST-06 series is a solenoid-controlled relief valve: a full pilot-operated relief stage whose vent is switched by a solenoid, so one electrical signal toggles the system between relief protection and near-zero-pressure unloading. That single function eliminates a separate vent valve, its subplate and its wiring.

BSG-06 mounts on the standard subplate interface and BST-06 on pipe threads; both carry the (S)- marked variants for circuits with an additional control port. In practice this valve runs pump unloading in accumulator circuits, standby/idle switching on presses, and two-pressure systems where the solenoid selects between working pressure and low-pressure circulation.

Interchanging with the Yuken BSG/BST series, the valve is pressure-tested individually and solenoid-cycled before packing with anti-rust treatment. Distributors stocking BSG-06 typically add the matching BT/BG-03 pilot relief and DSG directional valves for a complete pressure-control program — ask for the package quotation within 24 hours.`,
  },

  "solenoid-relief-valve-10": {
    short:
      "Solenoid-controlled relief valve BSG-10 (subplate) / BST-10 (threaded) — pump unloading for larger systems.",
    long: `The BSG-10 series is the large-size solenoid-controlled relief valve: a pilot-operated relief stage with a solenoid-switched vent, so a single electrical signal moves the system between protected working pressure and pump unloading. For large power units the flow passed at idle is too great to waste through a fixed relief — unloading through the vented pilot stage is what keeps oil temperature and energy cost under control.

BSG-10 mounts on the standard subplate interface with pipe-thread variants for line mounting, and the solenoid is available in 12/24 VDC and 110/220 VAC. The pilot design keeps the pressure characteristic flat across the valve's flow range, with the same low pressure override expected from a dedicated relief valve.

Interchanging with the Yuken BSG series, every valve is individually pressure-tested and solenoid-cycled before export packing with anti-rust treatment. State your unloading logic and voltage — we quote the complete valve within 24 hours.`,
  },

  "manual-valve-p40": {
    short:
      "P40 series manual directional valves — lever-operated, 4-way rotary spools (1P40-OT … 6P40-OT), no electrics required.",
    long: `The P40 series is a lever-operated manual directional valve: a rotary spool, shifted by hand through a positive detent, with no solenoid, no wiring and no electrical failure mode at all. The 1P40-OT through 6P40-OT codes cover the standard 4-way spool functions in two- and three-position versions, with spring-return and detent options.

That independence from electrics is the reason the P40 keeps a place in modern systems: emergency and failsafe circuits that must keep working when power fails, portable power units and test rigs that move between sites, agricultural and construction attachments where a lever is simply the right control. The rotary design holds its position without continuous operator force, and the detent gives clear, positive engagement on every shift.

Each valve is pressure-tested and shifted through all positions on the bench before packing with anti-rust treatment. Manual valves are also a fast-moving distributor spare for legacy machines — send us the existing model code and we quote the direct replacement within 24 hours.`,
  },

  "china-cy-piston-pump": {
    short:
      "CY14-1B series axial piston pump — swashplate design, 31.5 MPa class, fixed (MCY) and variable (SCY/YCY) displacement options.",
    long: `The CY14-1B series is a swashplate axial piston pump in the 31.5 MPa (315 bar) class — the workhorse pressure source for industrial hydraulic systems in China and worldwide, in production for decades with an enormous installed base of spares demand. Displacements span 10 to 250 mL/r, covering everything from a compact power unit to a large press drive.

Three control variants cover the common installations: MCY fixed displacement for simple constant-flow systems, SCY manual variable where the operator sets the flow by handwheel, and YCY pressure-compensated for energy-saving circuits that reduce displacement automatically as pressure rises. The hydrostatically balanced slipper design and swashplate construction give the long service life the series is known for.

Every pump is run-tested on the bench before packing; anti-rust treatment, sealed ports and export cases are standard. As a direct interchange for the CY14-1B series, it is a mainstay for press retrofits and power unit builders — tell us your displacement and control type for a quotation within 24 hours.`,
  },

  "variable-vane-pump-svpf20": {
    short:
      "SVPF variable vane pump — 12/15/20 L/min classes, pressure-compensated, low-noise operation, 7 MPa class.",
    long: `The SVPF series is a pressure-compensated variable vane pump: the cam ring shifts automatically with system pressure, so the pump delivers exactly the flow the circuit demands — and de-strokes to near zero when the system deadheads. Instead of a fixed-displacement pump dumping its full flow over a relief valve at working pressure, the SVPF idles at near-zero displacement, holding pressure with almost no heat generation or wasted horsepower.

The 12/15/20 L/min classes (SVPF-12/15/20) cover machine tool feeds, grinding machines, lubrication systems and small presses, where the vane design's quiet running is a requirement rather than a bonus. Pressure compensation also removes the need for the relief valve to handle full flow continuously, simplifying the circuit and lowering oil temperature over a shift.

Interchanging with the Yuken SVPF / PV2R-style pumps, each unit is run-tested on the bench before export packing with anti-rust treatment. State your flow and pressure setting — quotation within 24 hours.`,
  },

  "variable-vane-pump-svpf40": {
    short:
      "SVPF variable vane pump — 30/40 L/min classes, pressure-compensated, energy-saving, low-noise operation.",
    long: `The SVPF40 series is the larger frame of the pressure-compensated variable vane pump line, with 30 and 40 L/min displacement classes (SVPF-30/40) for systems that need the vane pump's quiet, cool operation at higher flows. The pressure compensator shifts the cam ring with system pressure, so the pump meters flow to demand and de-strokes to near zero at deadhead — the relief valve stops being the system's biggest heat source.

That energy behavior is worth real money over a shift: machine tools, plastics machinery and industrial power units run cooler, the oil lasts longer, and the electric motor draws only the power the circuit actually uses. The low noise level also matters where the power unit sits beside the operator, not in a plant room.

Built to interchange with the Yuken SVPF-style pumps, every unit is run-tested before export packing with anti-rust treatment and sealed ports. Combined with the SVPF20 series, the two frames cover 12 to 40 L/min from one supplier — ask for the full catalog and a quotation within 24 hours.`,
  },
};

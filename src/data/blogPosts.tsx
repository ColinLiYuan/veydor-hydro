import type { ReactNode } from "react";
import Link from "next/link";

/**
 * 博客文章 —— 静态内容,每篇锚定一个买家搜索意图(关键词调研结果见 git 历史):
 * 1) DSG-01/4WE6 互换对照(型号查询,长尾大)
 * 2) 直动 vs 先导溢流阀(选型类)
 * 3) 变量叶片泵原理与节能(原理类)
 * 4) 100% 压力测试意味着什么(E-E-A-T 锚点,内链 /quality)
 * 5) 从中国进口液压阀采购指南(采购决策类,漏斗顶部)
 * 正文用 JSX 直接书写,由 src/app/blog/[slug]/page.tsx 渲染,
 * 样式由 globals.css 的 .article-body 类控制。
 */
export interface BlogPost {
  slug: string;
  title: string;
  /** meta description / 列表卡片摘要 */
  description: string;
  /** ISO 日期,用作 datePublished */
  date: string;
  tags: string[];
  readMinutes: number;
  body: ReactNode;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "dsg-01-vs-4we6-interchange-guide",
    title: "DSG-01 vs 4WE6: The Interchange Guide for NG6 Solenoid Valves",
    description:
      "Yuken DSG-01, Rexroth 4WE6, Vickers DG4V-3 — the spool cross-reference table, the mounting standard that makes them interchangeable, and the four things to check before you swap.",
    date: "2026-10-05",
    tags: ["Solenoid Valves", "Interchange"],
    readMinutes: 7,
    body: (
      <>
        <p>
          Most hydraulic distributors eventually face the same question: the
          customer's schematic calls for a DSG-01, the machine on the shop
          floor wears a 4WE6, and the shelf holds a DG4V-3. Are these the same
          valve? In mounting and function — yes. This guide explains what the
          interchange actually covers, and the four checks that separate a safe
          swap from an expensive mistake.
        </p>

        <h2>One mounting standard, three order codes</h2>
        <p>
          All three valves bolt to the same NG6 subplate — also called CETOP 3
          or ISO 4401-03. The bolt pattern, port positions and O-ring layout are
          fixed by that standard, which is why valves from different
          manufacturers mount interchangeably without re-drilling the manifold.
          The family includes the Yuken DSG-01, Bosch Rexroth 4WE6, Vickers
          DG4V-3, and interchange production from manufacturers like VEYDOR.
        </p>
        <p>
          The electrical side is just as standardized: a wet-armature solenoid
          with a DIN 43650 connector, supplied in 12/24 VDC and 110/220 VAC.
          Rated performance for the class is 315 bar (31.5 MPa) maximum pressure
          and roughly 63 L/min maximum flow, with small differences between
          brands on the exact flow limit per spool type.
        </p>

        <h2>The spool cross-reference table</h2>
        <p>
          The spool code — not the brand — is what defines the valve's
          behavior. The most common spool functions map one-to-one across the
          three ordering systems:
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Function</th>
                <th>Yuken DSG-01</th>
                <th>Rexroth 4WE6</th>
                <th>Vickers DG4V-3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3-position, all ports blocked in center</td>
                <td>3C2</td>
                <td>4WE6E</td>
                <td>DG4V-3-2C</td>
              </tr>
              <tr>
                <td>3-position, pump to tank in center</td>
                <td>3C3</td>
                <td>4WE6H</td>
                <td>DG4V-3-0C</td>
              </tr>
              <tr>
                <td>3-position, A and B to tank in center</td>
                <td>3C4</td>
                <td>4WE6J</td>
                <td>DG4V-3-6C</td>
              </tr>
              <tr>
                <td>3-position, pump to A and B in center</td>
                <td>3C60</td>
                <td>4WE6G</td>
                <td>DG4V-3-8C</td>
              </tr>
              <tr>
                <td>2-position, spring offset</td>
                <td>2B2 / 2B3</td>
                <td>4WE6D / 4WE6C</td>
                <td>DG4V-3-2A / 0A</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          For the two-position spools, the spring-offset port connection
          differs between conventions, so always confirm against the circuit
          symbol in the schematic rather than the code alone.
        </p>

        <h2>The four checks before you swap</h2>
        <ul>
          <li>
            <strong>Spool symbol.</strong> Read the schematic, not the old
            nameplate. A 3C2 in a circuit designed for 3C60 will block a
            cylinder instead of moving it.
          </li>
          <li>
            <strong>Coil voltage.</strong> 24 VDC and 110 VAC coils are not
            interchangeable on the machine. The connector is standard; the
            voltage is not.
          </li>
          <li>
            <strong>Flow rating.</strong> The mounting interface is identical,
            but flow limits differ slightly between brands and spool types. At
            more than 60 L/min, check the datasheet or move to the NG10 size.
          </li>
          <li>
            <strong>Seals.</strong> Subplate O-rings should be renewed at every
            valve change — the most common cause of a "new valve leaking" is
            the old seal underneath it.
          </li>
        </ul>

        <h2>Buying the interchange</h2>
        <p>
          Because the standard fixes the interface, interchange production
          competes on machining quality and testing, not on compatibility. Our{" "}
          <Link href="/products/dsg-solenoid-directional-valve-01">
            DSG-01 series
          </Link>{" "}
          covers the spool codes above with AC and DC coils, and each valve is
          pressure- and function-tested individually before packing. If your
          customer's fleet mixes brands, one supplier can cover the DSG-01,
          4WE6 and DG4V-3 positions —{" "}
          <Link href="/contact">send us your spool codes</Link> and we quote
          the full set within 24 hours.
        </p>
      </>
    ),
  },

  {
    slug: "direct-vs-pilot-operated-relief-valves",
    title: "Direct-Acting vs Pilot-Operated Relief Valves: Which Belongs in Your Circuit?",
    description:
      "Response time versus pressure override, the flow limit that decides for you, and the vent-port trick only pilot-operated valves have. With a selection table.",
    date: "2026-10-14",
    tags: ["Relief Valves", "Circuit Design"],
    readMinutes: 6,
    body: (
      <>
        <p>
          Every hydraulic system has a relief valve, but surprisingly many have
          the wrong kind. Direct-acting and pilot-operated relief valves solve
          the same problem — capping system pressure — with two different
          mechanisms, and each is clearly right in some circuits and clearly
          wrong in others.
        </p>

        <h2>How each one works</h2>
        <p>
          A <strong>direct-acting relief valve</strong> is a spring holding a
          poppet on its seat. When system pressure overcomes the spring force,
          the poppet lifts and flow escapes to tank. There is one moving part
          between pressure and protection, which makes it the fastest relief
          valve available — response in milliseconds — and the most tolerant of
          contaminated oil. The trade-off is the spring: as flow increases, the
          poppet must open further, compressing the spring more, so the actual
          pressure rises above the set point. That difference is called
          pressure override.
        </p>
        <p>
          A <strong>pilot-operated relief valve</strong> adds a small pilot
          stage: a tiny poppet cracks at the set pressure, which unbalances the
          large main poppet and opens the full flow path. Because the main
          stage is positioned hydraulically, not by a spring, the
          pressure-versus-flow curve stays almost flat — very low override even
          at maximum flow. The pilot stage also gives the design its most
          valuable feature: a <strong>vent port</strong> that can drain the
          pilot chamber on command, dropping the main stage open for pump
          unloading or two-pressure operation. A direct-acting valve cannot do
          this at all.
        </p>

        <h2>Selection at a glance</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Criterion</th>
                <th>Direct-acting</th>
                <th>Pilot-operated</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Response</td>
                <td>Fastest (milliseconds)</td>
                <td>Slower, but adequate for system protection</td>
              </tr>
              <tr>
                <td>Pressure override</td>
                <td>Higher, grows with flow</td>
                <td>Very low, flat curve</td>
              </tr>
              <tr>
                <td>Practical flow range</td>
                <td>Up to about 60 L/min</td>
                <td>High flows, no practical ceiling in this class</td>
              </tr>
              <tr>
                <td>Contamination tolerance</td>
                <td>Excellent</td>
                <td>Good; pilot orifice must stay clean</td>
              </tr>
              <tr>
                <td>Remote vent / unloading</td>
                <td>Not available</td>
                <td>Vent port for unloading and two-pressure circuits</td>
              </tr>
              <tr>
                <td>Typical role</td>
                <td>Secondary protection, small power units</td>
                <td>Main system protection, large flows</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Rules of thumb</h2>
        <ul>
          <li>
            Below about 60 L/min, either type works; choose direct-acting for
            its speed and simplicity, pilot-operated where the flat pressure
            curve matters.
          </li>
          <li>
            Above 60 L/min, pilot-operated is the practical choice — a
            direct-acting spring strong enough for the flow becomes hard to
            adjust and its override grows unacceptable.
          </li>
          <li>
            If the circuit needs pump unloading, two pressure levels, or remote
            adjustment, the vent port decides it: pilot-operated, or a
            solenoid-controlled relief valve built on one.
          </li>
          <li>
            Direct-acting valves remain the right choice as backup protection
            in parallel with a pilot-operated main — two different mechanisms
            mean two different failure modes.
          </li>
        </ul>

        <h2>The vent port in practice</h2>
        <p>
          The vent port is why solenoid relief valves exist. A{" "}
          <Link href="/products/solenoid-relief-valve-06">
            solenoid-controlled relief valve
          </Link>{" "}
          switches its own vent electrically, unloading the pump at idle or
          selecting between two pressure levels — no separate vent valve, no
          extra wiring. Our{" "}
          <Link href="/products/pilot-operated-relief-valve-03">
            BT/BG-03 pilot relief series
          </Link>{" "}
          offers the same vent function with a manual or solenoid option, and
          the{" "}
          <Link href="/products/modular-relief-valve-01">modular MB series</Link>{" "}
          puts pilot-operated protection inside the valve stack itself. Tell us
          your flow and setting — we will confirm the right type with the
          quotation.
        </p>
      </>
    ),
  },

  {
    slug: "how-a-variable-vane-pump-works",
    title: "How a Variable Vane Pump Works — and Why It Saves Energy",
    description:
      "Cam ring, eccentricity and pressure compensation explained without jargon — including the reason a variable vane pump idles at near-zero flow while holding pressure.",
    date: "2026-10-21",
    tags: ["Pumps", "Energy Saving"],
    readMinutes: 6,
    body: (
      <>
        <p>
          A fixed-displacement pump delivers the same flow per revolution no
          matter what the circuit needs. A variable vane pump delivers only
          what the circuit asks for — and the difference shows up as cooler
          oil, a smaller electric motor and a lower electricity bill. Here is
          how it works.
        </p>

        <h2>Step 1: the vanes do the pumping</h2>
        <p>
          Inside the pump, a slotted rotor carries sliding vanes and spins
          inside a large ring — the cam ring. The rotor and the ring are not
          concentric: the rotor sits off-center, and the gap between them
          changes around the circle. As a vane passes the wide side, the chamber
          between vanes grows and draws oil in through the suction port; as it
          passes the narrow side, the chamber shrinks and pushes oil out
          through the pressure port. That is the entire pumping mechanism:
          growth and shrinkage of volume, driven by eccentricity.
        </p>

        <h2>Step 2: moving the ring changes the flow</h2>
        <p>
          The cam ring is not fixed — it can slide. Push it toward the rotor
          until they are concentric and the chamber volumes stop changing: zero
          flow. Push it away to maximum eccentricity and every revolution pumps
          the full displacement. Because the ring is light, it moves quickly
          and smoothly, and displacement changes continuously between zero and
          maximum. That is the "variable" in variable vane pump.
        </p>

        <h2>Step 3: pressure compensation closes the loop</h2>
        <p>
          The pressure-compensated design connects the pump outlet to a control
          piston that pushes the ring toward concentric, fighting a spring that
          holds it at maximum eccentricity. At low pressure the spring wins:
          full flow. As outlet pressure approaches the compensator setting, the
          control piston overcomes the spring and the ring slides toward zero
          displacement — flow drops to exactly what the system is consuming at
          that pressure. When the circuit deadheads, the pump de-strokes to
          near zero and simply holds pressure.
        </p>
        <p>
          Compare that to a fixed pump: at deadhead it keeps pumping full flow
          over the relief valve at full pressure. A 20 L/min circuit holding
          7 MPa converts roughly 2.3 kW of hydraulic power into heat while
          doing no useful work — a permanent oil heater running whenever the
          machine idles. A compensated vane pump in the same circuit idles at
          near-zero flow, generating almost no heat and drawing almost no
          power. The relief valve stops being a continuous heat source.
        </p>

        <h2>Where variable vane pumps earn their keep</h2>
        <ul>
          <li>
            Machine tools and grinding machines, where quiet running and cool
            oil are requirements, not preferences.
          </li>
          <li>
            Systems with long hold-at-pressure phases — clamping circuits,
            plastics machinery — where a fixed pump would heat the tank for
            hours.
          </li>
          <li>
            Any power unit where the motor is sized for peak flow but runs at
            partial demand most of the time.
          </li>
        </ul>

        <h2>Selecting one</h2>
        <p>
          The practical selection inputs are displacement class, compensator
          pressure range, and shaft rotation. Our{" "}
          <Link href="/products/variable-vane-pump-svpf20">
            SVPF20 series
          </Link>{" "}
          covers 12–20 L/min and the{" "}
          <Link href="/products/variable-vane-pump-svpf40">
            SVPF40 series
          </Link>{" "}
          30–40 L/min, both in the 7 MPa class with pressure compensation as
          standard. Each pump is run-tested before packing —{" "}
          <Link href="/contact">send us your flow and pressure</Link> and we
          will confirm the frame size with the quotation.
        </p>
      </>
    ),
  },

  {
    slug: "what-100-percent-pressure-testing-means",
    title: "What “100% Pressure Testing” Actually Means — and How to Verify It",
    description:
      "Batch sampling cannot catch every valve. What a real test bench checks, why per-unit testing matters, and the questions that expose suppliers who only claim it.",
    date: "2026-10-28",
    tags: ["Quality Control", "Sourcing"],
    readMinutes: 5,
    body: (
      <>
        <p>
          "100% pressure tested" appears on almost every hydraulic valve
          catalog page. It is also the claim most often untrue. This article
          explains what per-unit testing actually involves, why it matters more
          in hydraulics than in most industries, and the four questions that
          separate a real test program from a line on a brochure.
        </p>

        <h2>What happens on a real test bench</h2>
        <p>
          A proper valve test is not a pressure gauge and a prayer. The valve
          is mounted on a test manifold, connected to a power unit, and run
          through a fixed sequence:
        </p>
        <ul>
          <li>
            <strong>Pressure test</strong> at rated pressure — and typically a
            short proof test above it — to verify the casting, seals and
            machining hold without external leakage.
          </li>
          <li>
            <strong>Function test:</strong> every spool position is shifted and
            the port connections verified against the circuit symbol, so a 3C2
            is confirmed to actually be a 3C2.
          </li>
          <li>
            <strong>Solenoid cycling</strong> for solenoid valves — the coil is
            energized repeatedly to catch early electrical or mechanical
            failures.
          </li>
          <li>
            <strong>Internal leakage measurement</strong> against the
            acceptance limit for that model, which is where worn bores and
            undersized spools are caught.
          </li>
        </ul>
        <p>
          The output is a pass/fail record per valve — and just as importantly,
          a record of the failures. A test program that never fails anything is
          a test program that is not running.
        </p>

        <h2>Why sampling is not enough</h2>
        <p>
          Sampling works when defects are batch-uniform. Hydraulic valve
          defects are not: a burr from one tool change, one bad O-ring from a
          mixed box, one porous casting in a hundred. A valve that leaks at 315
          bar can look identical to a good one on the shelf. Per-unit testing
          is the only way to catch the individual failures before they reach a
          customer's machine — where one leaking valve can cost a shift of
          downtime and a warranty claim across an ocean.
        </p>

        <h2>The four questions that expose claims</h2>
        <ul>
          <li>
            <strong>"Show me the test record format."</strong> A supplier with
            a real program can show the per-unit record sheet — test date,
            pressures, result, inspector. If the answer is a general promise,
            there is no program.
          </li>
          <li>
            <strong>"What happens to failed units?"</strong> A real program has
            a quarantine and rework path. No answer means failures are shipped.
          </li>
          <li>
            <strong>"Can I see the bench live?"</strong> A five-minute video
            call to the test bench tells you more than any certificate. A real
            manufacturer can do this on request.
          </li>
          <li>
            <strong>"Will you test to my spec?"</strong> Serious buyers test to
            a standard — ISO 5208-style leakage classes, or their own
            acceptance limits. A supplier that accepts your limits is a
            supplier that has a bench, not just a brochure.
          </li>
        </ul>

        <h2>How we run it</h2>
        <p>
          At VEYDOR, every valve is individually pressure- and function-tested
          on calibrated benches before it is packed — the same process
          described on our{" "}
          <Link href="/quality">quality control page</Link>, including
          dimensional inspection, material verification and batch traceability.
          Inspection records are kept per batch and available on request. Ask
          us for a test record sample with your next quotation —{" "}
          <Link href="/contact">contact us</Link> and judge the program
          yourself.
        </p>
      </>
    ),
  },

  {
    slug: "importing-hydraulic-valves-from-china",
    title: "Importing Hydraulic Valves from China: The 2026 Buyer's Playbook",
    description:
      "Manufacturer versus trader, certificate checks, material traceability, landed cost and inspection hold points — the checklist we recommend our own buyers use.",
    date: "2026-11-02",
    tags: ["Sourcing", "Buyer Guide"],
    readMinutes: 8,
    body: (
      <>
        <p>
          Buying hydraulic valves from China can cut your landed cost by half —
          or double your warranty claims. The difference is almost never the
          factory; it is how the order was qualified. This is the playbook we
          recommend to our own customers, written so you can apply it to any
          supplier — including us.
        </p>

        <h2>Step 1: verify you are buying from a manufacturer</h2>
        <p>
          The hydraulic valve trade has many honest traders and many
          factories that only assemble. What you need to know is which kind of
          operation you are dealing with, because it determines who controls
          quality when something fails.
        </p>
        <ul>
          <li>
            Check the ISO 9001 certificate against the IAF CertSearch database
            — a scanned certificate is not verification.
          </li>
          <li>
            Confirm the factory address on the business license matches the
            shipping and audit address.
          </li>
          <li>
            Ask for a live video walkthrough. A real valve factory has CNC
            machining centers, honing machines, and test benches — the
            walkthrough takes five minutes and settles the question.
          </li>
          <li>
            Ask what they machine in-house versus buy in. "We machine valve
            bodies and spools ourselves" is a good answer; "we source
            everything" is not automatically bad, but changes your inspection
            plan.
          </li>
        </ul>

        <h2>Step 2: fix the specification before the price</h2>
        <p>
          The cheapest way to import the wrong valves is to order by catalog
          page. Hydraulic interchange codes — DSG-01, 4WE6, MBP-03 — define a
          mounting standard and a spool function, not a complete specification.
          Before quoting:
        </p>
        <ul>
          <li>
            List every model with spool code, coil voltage, port configuration
            and seal type. See our{" "}
            <Link href="/blog/dsg-01-vs-4we6-interchange-guide">
              DSG-01 / 4WE6 interchange guide
            </Link>{" "}
            for the cross-reference approach.
          </li>
          <li>
            Request dimensioned drawings for each model and compare against the
            machine's existing valves — mounting interfaces are standard, but
            overall heights and port positions still matter.
          </li>
          <li>
            Normalize all quotes into one comparison table. The lowest EXW
            price is meaningless if one quote excludes coils and another
            excludes seals.
          </li>
        </ul>

        <h2>Step 3: demand documentation, not promises</h2>
        <ul>
          <li>
            <strong>Material traceability:</strong> EN 10204 Type 3.1 material
            certificates with heat numbers for bodies and spools. Without
            these, a cracked casting has no root cause and no recourse.
          </li>
          <li>
            <strong>Test records:</strong> per-unit pressure and function test
            records, not a batch summary. Read{" "}
            <Link href="/blog/what-100-percent-pressure-testing-means">
              what 100% testing actually means
            </Link>{" "}
            before accepting the claim.
          </li>
          <li>
            <strong>Warranty in writing:</strong> 12 months minimum from
            shipment, with a defined failure-analysis and replacement process —
            including who pays freight on warranty returns.
          </li>
        </ul>

        <h2>Step 4: buy the landed cost, not the EXW price</h2>
        <p>
          Build the real number: EXW price plus inland freight, export packing,
          ocean or air freight, duties and customs brokerage. Specify Incoterms
          2020 explicitly — a quote without an Incoterm is a misunderstanding
          waiting to be paid for. Then add the cost of your own risk: a first
          sample order is not optional overhead, it is the cheapest insurance
          you will ever buy. Ten sample valves pressure-tested on your own
          bench answer questions no certificate can.
        </p>

        <h2>Step 5: put hold points in the purchase order</h2>
        <p>
          The purchase order is where inspection happens or doesn't. Write the
          hold points in: material certificates before machining, first-article
          inspection of the first run, pre-shipment inspection with
          buyer-witnessed testing or a third party (SGS, BV, TÜV). A supplier
          that accepts hold points and buyer-witnessed testing is a supplier
          with a real process —{" "}
          <Link href="/quality">here is ours, on the record</Link>. Suppliers
          that refuse them were never going to ship what they promised.
        </p>

        <h2>The short checklist</h2>
        <ul>
          <li>Manufacturer verified (certificate, address, walkthrough)</li>
          <li>Specification fixed per model (spool, voltage, seals, drawings)</li>
          <li>Material certificates and per-unit test records required</li>
          <li>12-month written warranty with defined process</li>
          <li>Landed cost calculated with Incoterms</li>
          <li>Sample order first, hold points in the PO</li>
        </ul>
        <p>
          Run the same checklist on us — we expect serious buyers to. Our{" "}
          <Link href="/products">full catalog</Link> carries model-level SKUs,
          MOQ and weights, and the sales team answers specification questions
          with drawings, not adjectives.{" "}
          <Link href="/contact">Send your valve schedule</Link> and we will
          return a normalized quotation within 24 hours.
        </p>
      </>
    ),
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** "Oct 5, 2026" */
export function formatPostDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

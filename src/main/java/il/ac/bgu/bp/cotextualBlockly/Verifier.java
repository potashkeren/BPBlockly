package il.ac.bgu.bp.cotextualBlockly;

import il.ac.bgu.cs.bp.bpjs.analysis.DfsBProgramVerifier;
import il.ac.bgu.cs.bp.bpjs.analysis.VerificationResult;
import il.ac.bgu.cs.bp.bpjs.analysis.listeners.BriefPrintDfsVerifierListener;
import il.ac.bgu.cs.bp.bpjs.context.ContextService;
import il.ac.bgu.cs.bp.bpjs.model.BProgram;
import il.ac.bgu.cs.bp.bpjs.model.ResourceBProgram;

public class Verifier {
    public static void main(String[] args) throws Exception {
        ContextService contextService = ContextService.getInstance();
        contextService.init("ContextDB");
        BProgram program = new ResourceBProgram("context.js","Contextual_TTT_Population.js", "Contextual_TTT.js");
        DfsBProgramVerifier vrf = new DfsBProgramVerifier();           // ... and a verifier
        vrf.setProgressListener(new BriefPrintDfsVerifierListener());  // add a listener to print progress
        VerificationResult res = vrf.verify(program);                  // this might take a while

        if(res.isViolationFound()) {
            System.out.println(res.getViolation());
        }

    }
}

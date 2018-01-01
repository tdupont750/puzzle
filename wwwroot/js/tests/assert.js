const Assert = function () {
    "use strict";

    return {
        runTests,
        areEqual
    };
    
    function runTests(justThrow, fixtures) {
        let success = 0,
            failure = 0;
        
        console.log('=== STARTING ===');
        
        for (let f in fixtures) {
            console.log('');
            console.log('--- FIXTURE: ' + f + ' ---');
            
            for (let t in fixtures[f]) {
                console.log('');
                console.log('    RUNNING: ' + t);

                if (justThrow) {
                    fixtures[f][t]();
                }
                else {
                    try {
                        fixtures[f][t]();
                        console.log('    SUCCESS');
                        success++;
                    } catch (ex) {
                        console.log('    FAILURE: '+ ex);
                        failure++;
                    }
                }
            }
        }
        
        console.log('');
        console.log('=== COMPLETE ===');
        console.log('');
        console.log('TOTAL: ' + (success + failure));
        console.log('SUCCESSES: ' + success);
        console.log('FAILURES: ' + failure);
    }
    
    function areEqual(expected, actual, msg) {
        if (expected !== actual) {
            error('not equal', expected, actual, msg);
        }
    }
    
    function error(type, expected, actual, msg) {
        console.log('ERROR: ' + type);
        console.log('EXPECTED: ' + expected);
        console.log('ACTUAL: ' + actual);
        console.log('MESSAGE: ' + msg);

        throw type + ': ' + msg;
    }
};